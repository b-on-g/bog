namespace $ {

	const seed_posts: $bog_sample_post[] = [
		{ id: '1', title: 'First post', body: 'Hello from the sample backend.' },
		{ id: '2', title: 'Second post', body: 'REST and frontend share the same TS type.' },
		{ id: '3', title: 'Third post', body: 'Type lives in bog/sample/post and both sides import it.' },
	]

	export class $bog_sample_api extends $mol_server {

		override port() {
			return Number( process.env.BOG_SAMPLE_API_PORT ?? 9091 )
		}

		posts(): readonly $bog_sample_post[] {
			return seed_posts
		}

		override expressHandlers(): readonly $mol_server_middleware[] {
			return [
				this.expressCors(),
				this.expressCompressor(),
				this.expressApi(),
			]
		}

		expressApi(): $mol_server_middleware {
			return ( req, res, next ) => {
				if( req.method === 'GET' && req.path === '/api/posts' ) {
					res.setHeader( 'Content-Type', 'application/json' )
					res.end( JSON.stringify( this.posts() ) )
					return
				}
				next()
			}
		}

	}

}
