namespace $ {

	const meta_attr_re = /\sdata-bog-meta\s*=\s*"([^"]*)"/gi

	export function $bog_meta_collect( html: string ): $bog_meta_data {
		let merged: $bog_meta_data = {}
		meta_attr_re.lastIndex = 0
		let match: RegExpExecArray | null
		while( ( match = meta_attr_re.exec( html ) ) !== null ) {
			const raw = match[ 1 ]
			if( !raw ) continue
			let parsed: $bog_meta_data
			try {
				parsed = JSON.parse( decode_entities( raw ) )
			} catch {
				continue
			}
			merged = $bog_meta_merge( merged, parsed )
		}
		return merged
	}

	export function $bog_meta_inject( html: string, canonical_url?: string ): string {
		const meta = $bog_meta_collect( html )
		const final: $bog_meta_data = canonical_url
			? { canonical: canonical_url, ... meta }
			: meta

		const compact = $bog_meta_compact( final )
		if( !compact ) return html

		const tags = build_tags( compact )
		if( !tags ) return html

		const head_close = html.indexOf( '</head>' )
		if( head_close < 0 ) return html
		return html.slice( 0, head_close ) + tags + html.slice( head_close )
	}

	function build_tags( data: $bog_meta_data ): string {
		const out: string[] = []
		if( data.title ) {
			out.push( `<title>${ escape_html( data.title ) }</title>` )
			out.push( meta_tag( 'name', 'twitter:title', data.title ) )
		}
		if( data.description ) {
			out.push( meta_tag( 'name', 'description', data.description ) )
		}
		if( data.canonical ) {
			out.push( `<link rel="canonical" href="${ escape_attr( data.canonical ) }">` )
		}
		if( data.og_title ) out.push( meta_tag( 'property', 'og:title', data.og_title ) )
		if( data.og_description ) out.push( meta_tag( 'property', 'og:description', data.og_description ) )
		if( data.og_image ) out.push( meta_tag( 'property', 'og:image', data.og_image ) )
		if( data.og_type ) out.push( meta_tag( 'property', 'og:type', data.og_type ) )

		return out.length ? '\n\t' + out.join( '\n\t' ) + '\n' : ''
	}

	function meta_tag( kind: 'name' | 'property', key: string, value: string ): string {
		return `<meta ${ kind }="${ escape_attr( key ) }" content="${ escape_attr( value ) }">`
	}

	function escape_attr( s: string ): string {
		return s
			.replace( /&/g, '&amp;' )
			.replace( /"/g, '&quot;' )
			.replace( /</g, '&lt;' )
			.replace( />/g, '&gt;' )
	}

	function escape_html( s: string ): string {
		return s
			.replace( /&/g, '&amp;' )
			.replace( /</g, '&lt;' )
			.replace( />/g, '&gt;' )
	}

	function decode_entities( s: string ): string {
		return s
			.replace( /&quot;/g, '"' )
			.replace( /&lt;/g, '<' )
			.replace( /&gt;/g, '>' )
			.replace( /&amp;/g, '&' )
	}

}
