namespace $ {

	const crawler_ua = /Googlebot|bingbot|yandex|baiduspider|Facebot|facebookexternalhit|Twitterbot|twitterbot|rogerbot|linkedinbot|embedly|quora link preview|showyoubot|outbrain|pinterest|slackbot|vkShare|Telegram|TelegramBot|Discord|Discordbot|WhatsApp|Applebot|DuckDuckBot|Sogou|ia_archiver|Semrush|AhrefsBot|MJ12bot|DotBot|PetalBot/i

	const href_re = /<a\s[^>]*href\s*=\s*["']([^"']+)["']/gi
	const title_re = /<title[^>]*>([^<]*)<\/title>/i
	const meta_desc_re = /<meta[^>]+name\s*=\s*["']description["'][^>]+content\s*=\s*["']([^"']*)["']/i

	function extract_links( html: string, base_url: string, root_origin: string ): string[] {
		const out: string[] = []
		href_re.lastIndex = 0
		let match: RegExpExecArray | null
		while( ( match = href_re.exec( html ) ) !== null ) {
			const raw = match[ 1 ]
			if( !raw ) continue
			if( raw.startsWith( '#' ) ) continue
			if( raw.startsWith( 'mailto:' ) ) continue
			if( raw.startsWith( 'tel:' ) ) continue
			if( raw.startsWith( 'javascript:' ) ) continue
			let absolute: string
			try {
				absolute = new URL( raw, base_url ).toString()
			} catch {
				continue
			}
			const parsed = new URL( absolute )
			if( parsed.origin !== root_origin ) continue
			parsed.hash = ''
			out.push( parsed.toString() )
		}
		return out
	}

	function crawl_bfs( config: {
		root: string,
		render: ( url: string )=> string,
		max_depth: number,
		max_pages: number,
	} ): string[] {
		const { root, render, max_depth, max_pages } = config
		const root_origin = new URL( root ).origin
		const queue: { url: string, depth: number }[] = [ { url: root, depth: 0 } ]
		const seen = new Set< string >()
		while( queue.length && seen.size < max_pages ) {
			const { url, depth } = queue.shift()!
			if( seen.has( url ) ) continue
			seen.add( url )
			let html: string
			try {
				html = render( url )
			} catch( error ) {
				if( $mol_promise_like( error ) ) $mol_fail_hidden( error )
				continue
			}
			if( depth >= max_depth ) continue
			for( const link of extract_links( html, url, root_origin ) ) {
				if( !seen.has( link ) ) queue.push( { url: link, depth: depth + 1 } )
			}
		}
		return [ ... seen ]
	}

	function rewrite_to_base( raw: string, upstream: string, base: string ): string | null {
		try {
			const url = new URL( raw )
			const up = new URL( upstream )
			if( url.origin !== up.origin ) return null
			return base + url.pathname + url.search
		} catch {
			return null
		}
	}

	function escape_xml( s: string ): string {
		return s
			.replace( /&/g, '&amp;' )
			.replace( /</g, '&lt;' )
			.replace( />/g, '&gt;' )
			.replace( /"/g, '&quot;' )
			.replace( /'/g, '&apos;' )
	}

	function build_sitemap( config: {
		base: string,
		urls: string[],
		upstream: string,
	} ): string {
		const { base, urls, upstream } = config
		const lastmod = new Date().toISOString().slice( 0, 10 )
		const items = urls
			.map( raw => rewrite_to_base( raw, upstream, base ) )
			.filter( ( v ): v is string => !!v )
		const unique = [ ... new Set( items ) ]
		const body = unique.map( loc => (
			`\t<url>\n` +
			`\t\t<loc>${ escape_xml( loc ) }</loc>\n` +
			`\t\t<lastmod>${ lastmod }</lastmod>\n` +
			`\t</url>`
		) ).join( '\n' )
		return (
			`<?xml version="1.0" encoding="UTF-8"?>\n` +
			`<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
			body + '\n' +
			`</urlset>\n`
		)
	}

	function build_robots( base: string ): string {
		return (
			`User-agent: *\n` +
			`Allow: /\n` +
			`\n` +
			`Sitemap: ${ base }/sitemap.xml\n`
		)
	}

	function extract_title( html: string ): string {
		const m = title_re.exec( html )
		return m?.[ 1 ]?.trim() ?? ''
	}

	function extract_description( html: string ): string {
		const m = meta_desc_re.exec( html )
		return m?.[ 1 ]?.trim() ?? ''
	}

	function build_llms( config: {
		base: string,
		upstream: string,
		entries: { url: string, html: string }[],
	} ): string {
		const { base, upstream, entries } = config
		type Item = { url: string, title: string, description: string }
		const items: Item[] = []
		for( const e of entries ) {
			let url: URL, up: URL
			try {
				url = new URL( e.url )
				up = new URL( upstream )
			} catch {
				continue
			}
			if( url.origin !== up.origin ) continue
			items.push({
				url: base + url.pathname + url.search,
				title: extract_title( e.html ) || url.pathname,
				description: extract_description( e.html ),
			})
		}
		items.sort( ( a, b )=> a.url.localeCompare( b.url ) )
		const root = items.find( i => new URL( i.url ).pathname === '/' )
		const site_title = root?.title || 'Site'
		const site_description = root?.description || 'Site index'
		const lines = items.map( i =>
			`- [${ i.title }](${ i.url })${ i.description ? `: ${ i.description }` : '' }`
		)
		return (
			`# ${ site_title }\n\n` +
			`> ${ site_description }\n\n` +
			`## Pages\n\n` +
			lines.join( '\n' ) + '\n'
		)
	}

	export class $bog_seo extends $mol_server {

		override port() {
			return Number( process.env.BOG_SEO_PORT ?? 3334 )
		}

		upstream() {
			return process.env.BOG_SEO_UPSTREAM ?? 'http://localhost:9080'
		}

		cache_enabled() {
			return ( process.env.BOG_SEO_CACHE ?? 'true' ) === 'true'
		}

		cache_ttl() {
			return Number( process.env.BOG_SEO_CACHE_TTL ?? 3600000 )
		}

		warmup_enabled() {
			return ( process.env.BOG_SEO_WARMUP ?? 'false' ) === 'true'
		}

		max_depth() {
			return Number( process.env.BOG_SEO_MAX_DEPTH ?? 10 )
		}

		max_pages() {
			return Number( process.env.BOG_SEO_MAX_PAGES ?? 1000 )
		}

		cache = new Map< string, { html: string, timestamp: number } >()
		discovered = new Set< string >()
		warmup_done = false

		is_crawler( ua: string ) {
			return crawler_ua.test( ua )
		}

		render( url: string ) {
			const html = $bog_browser.html( url )
			return $bog_meta_inject( html, this.canonical_for( url ) )
		}

		canonical_for( url: string ) {
			try {
				const u = new URL( url )
				const up = new URL( this.upstream() )
				if( u.origin !== up.origin ) return undefined
				const canonical_base = process.env.BOG_SEO_CANONICAL_BASE
				if( !canonical_base ) return undefined
				return canonical_base.replace( /\/$/, '' ) + u.pathname + u.search
			} catch {
				return undefined
			}
		}

		cached_render( url: string ) {
			if( this.cache_enabled() ) {
				const entry = this.cache.get( url )
				if( entry && ( Date.now() - entry.timestamp ) < this.cache_ttl() ) {
					this.discovered.add( url )
					return { html: entry.html, from_cache: true }
				}
			}
			const html = this.render( url )
			if( this.cache_enabled() ) {
				this.cache.set( url, { html, timestamp: Date.now() } )
			}
			this.discovered.add( url )
			return { html, from_cache: false }
		}

		ensure_warmup() {
			if( this.warmup_done ) return
			this.warmup_done = true
			$mol_wire_async( this ).crawl_all()
		}

		crawl_all() {
			const root = this.upstream()
			const found = crawl_bfs({
				root,
				render: ( url )=> this.cached_render( url ).html,
				max_depth: this.max_depth(),
				max_pages: this.max_pages(),
			})
			for( const url of found ) this.discovered.add( url )
			this.$.$mol_log3_done({
				place: this,
				message: 'crawl complete',
				pages: this.discovered.size,
			})
		}

		sync_middleware(
			mdl: (
				req: typeof $node.express.request,
				res: typeof $node.express.response,
			) => void | boolean
		) {
			const wrapped = $mol_wire_async( mdl )
			return $mol_func_name_from( async (
				req: typeof $node.express.request,
				res: typeof $node.express.response,
				next: ( err?: unknown ) => any
			) => {
				try {
					const stopped = await wrapped( req, res )
					if( !stopped ) Promise.resolve().then( next )
				} catch( err ) {
					const error = err instanceof Error ? err : new Error( String( err ), { cause: err } )
					res.status( 500 ).send( error.message ).end()
					this.$.$mol_log3_fail({
						place: `${ this }.${ mdl.name }()`,
						uri: req.path,
						message: error.message,
					})
				}
			}, mdl )
		}

		override expressHandlers(): readonly $mol_server_middleware[] {
			return [
				this.expressCors(),
				this.expressCompressor(),
				this.expressSitemap(),
				this.expressRobots(),
				this.expressLlms(),
				this.expressGenerator(),
				this.expressProxy(),
			]
		}

		expressSitemap(): $mol_server_middleware {
			return this.sync_middleware( ( req, res )=> {
				if( req.path !== '/sitemap.xml' ) return false
				if( !this.warmup_done && this.discovered.size === 0 ) this.crawl_all()
				const base = `${ req.protocol }://${ req.get( 'host' ) }`
				res.set( 'Content-Type', 'application/xml' )
				res.send( build_sitemap({
					base,
					urls: [ ... this.discovered ],
					upstream: this.upstream(),
				}) ).end()
				return true
			} )
		}

		expressRobots(): $mol_server_middleware {
			return this.sync_middleware( ( req, res )=> {
				if( req.path !== '/robots.txt' ) return false
				const base = `${ req.protocol }://${ req.get( 'host' ) }`
				res.set( 'Content-Type', 'text/plain' )
				res.send( build_robots( base ) ).end()
				return true
			} )
		}

		expressLlms(): $mol_server_middleware {
			return this.sync_middleware( ( req, res )=> {
				if( req.path !== '/llms.txt' ) return false
				if( !this.warmup_done && this.discovered.size === 0 ) this.crawl_all()
				const base = `${ req.protocol }://${ req.get( 'host' ) }`
				const entries = [ ... this.discovered ].map( url => ({
					url,
					html: this.cache.get( url )?.html ?? '',
				}) )
				res.set( 'Content-Type', 'text/markdown; charset=utf-8' )
				res.send( build_llms({
					base,
					upstream: this.upstream(),
					entries,
				}) ).end()
				return true
			} )
		}

		override expressGenerator() {
			return this.sync_middleware( ( req, res )=> {
				this.ensure_warmup()
				return this.handle_request( req, res )
			} )
		}

		handle_request(
			req: typeof $node.express.request,
			res: typeof $node.express.response,
		) {
			const explicit_url = req.query?.url as string | undefined
			if( explicit_url ) {
				const { html, from_cache } = this.cached_render( explicit_url )
				res.set( 'Content-Type', 'text/html' )
				res.set( 'X-Prerender', from_cache ? 'cached' : 'rendered' )
				res.send( html ).end()
				return true
			}
			const ua = req.headers[ 'user-agent' ] ?? ''
			if( !this.is_crawler( ua ) ) return false
			const target = this.upstream() + req.originalUrl
			const { html, from_cache } = this.cached_render( target )
			res.set( 'Content-Type', 'text/html' )
			res.set( 'X-Prerender', from_cache ? 'cached' : 'rendered' )
			res.send( html ).end()
			return true
		}

		dump_to( output_dir: string ) {
			this.crawl_all()
			const base_origin = new URL( this.upstream() ).origin
			const out = $node.path.resolve( output_dir )
			$node.fs.mkdirSync( out, { recursive: true } )

			for( const url of this.discovered ) {
				const u = new URL( url )
				if( u.origin !== base_origin ) continue
				const entry = this.cache.get( url )
				if( !entry ) continue
				const rel = u.pathname.endsWith( '/' ) || u.pathname === ''
					? ( u.pathname || '/' ) + 'index.html'
					: u.pathname
				const file = $node.path.join( out, decodeURIComponent( rel ) )
				$node.fs.mkdirSync( $node.path.dirname( file ), { recursive: true } )
				$node.fs.writeFileSync( file, entry.html )
				this.$.$mol_log3_done({
					place: this,
					message: 'dump',
					url,
					file,
				})
			}

			const canonical_base = process.env.BOG_SEO_CANONICAL_BASE
				?? this.upstream().replace( /\/$/, '' )

			const sitemap_xml = ( ()=> {
				const entries = [ ... this.discovered ]
				const lastmod = new Date().toISOString().slice( 0, 10 )
				const items: string[] = []
				for( const raw of entries ) {
					try {
						const u = new URL( raw )
						if( u.origin !== base_origin ) continue
						items.push( canonical_base + u.pathname + u.search )
					} catch {}
				}
				const unique = [ ... new Set( items ) ]
				const body = unique.map( loc => (
					`\t<url>\n\t\t<loc>${ loc }</loc>\n\t\t<lastmod>${ lastmod }</lastmod>\n\t</url>`
				) ).join( '\n' )
				return (
					`<?xml version="1.0" encoding="UTF-8"?>\n` +
					`<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
					body + '\n' +
					`</urlset>\n`
				)
			} )()

			$node.fs.writeFileSync( $node.path.join( out, 'sitemap.xml' ), sitemap_xml )
			$node.fs.writeFileSync( $node.path.join( out, 'robots.txt' ),
				`User-agent: *\nAllow: /\n\nSitemap: ${ canonical_base }/sitemap.xml\n`,
			)

			this.$.$mol_log3_done({
				place: this,
				message: 'dump complete',
				pages: this.discovered.size,
				output_dir: out,
			})
		}

		expressProxy(): $mol_server_middleware {
			return ( req, res ) => {
				const target = new URL( this.upstream() )
				const options = {
					hostname: target.hostname,
					port: target.port || ( target.protocol === 'https:' ? 443 : 80 ),
					path: req.originalUrl,
					method: req.method,
					headers: {
						... req.headers,
						host: target.host,
					},
				}
				const proxy_req = $node.http.request( options, proxy_res => {
					res.writeHead( proxy_res.statusCode!, proxy_res.headers as any )
					proxy_res.pipe( res, { end: true } )
				} )
				proxy_req.on( 'error', err => {
					this.$.$mol_log3_fail({
						place: `${ this }.expressProxy()`,
						uri: req.path,
						message: err.message,
					})
					if( !res.headersSent ) {
						res.status( 502 ).send( 'Bad Gateway' ).end()
					}
				} )
				req.pipe( proxy_req, { end: true } )
			}
		}

	}

}
