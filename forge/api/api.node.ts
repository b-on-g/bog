namespace $ {

	type Sqlite = typeof import( 'node:sqlite' )
	type SqliteDB = InstanceType< Sqlite[ 'DatabaseSync' ] >

	/**
	 * SQL migrations. Append-only — never edit or remove past entries after deploy.
	 * Current schema version is stored in PRAGMA user_version and only newer
	 * migrations get applied.
	 */
	const migrations: Array< ( db: SqliteDB )=> void > = [
		db => db.exec( `
			CREATE TABLE items (
				id TEXT PRIMARY KEY,
				title TEXT NOT NULL,
				body TEXT NOT NULL,
				created_at INTEGER NOT NULL
			)
		` ),
	]

	function migrate( db: SqliteDB ) {
		const row = db.prepare( 'PRAGMA user_version' ).get() as { user_version: number } | undefined
		const current = row?.user_version ?? 0
		for( let i = current; i < migrations.length; i++ ) {
			db.exec( 'BEGIN' )
			try {
				migrations[ i ]!( db )
				db.exec( `PRAGMA user_version = ${ i + 1 }` )
				db.exec( 'COMMIT' )
			} catch( error ) {
				db.exec( 'ROLLBACK' )
				throw error
			}
		}
	}

	export class $bog_forge_api extends $mol_server {

		override port() {
			return Number( process.env.FORGE_API_PORT ?? 9092 )
		}

		db_path() {
			return process.env.FORGE_DB_PATH ?? 'bog/forge/api/forge.sqlite'
		}

		@ $mol_mem
		db(): SqliteDB {
			const sqlite = $node[ 'node:sqlite' ] as Sqlite
			const db = new sqlite.DatabaseSync( this.db_path() )
			migrate( db )
			return db
		}

		items(): $bog_forge_item[] {
			return this.db()
				.prepare( 'SELECT id, title, body, created_at FROM items ORDER BY created_at DESC' )
				.all() as unknown as $bog_forge_item[]
		}

		item_add( input: { title: string, body: string } ): $bog_forge_item {
			const id = `${ Date.now() }_${ Math.random().toString( 36 ).slice( 2, 10 ) }`
			const created_at = Date.now()
			this.db()
				.prepare( 'INSERT INTO items (id, title, body, created_at) VALUES (?, ?, ?, ?)' )
				.run( id, input.title, input.body, created_at )
			return { id, title: input.title, body: input.body, created_at }
		}

		item_delete( id: string ) {
			this.db().prepare( 'DELETE FROM items WHERE id = ?' ).run( id )
			return { ok: true }
		}

		override expressHandlers(): readonly $mol_server_middleware[] {
			return [
				this.expressCors(),
				this.expressCompressor(),
				this.expressBodier(),
				this.expressApi(),
			]
		}

		expressApi(): $mol_server_middleware {
			return ( req, res, next ) => {
				if( req.method === 'GET' && req.path === '/api/items' ) {
					res.json( this.items() )
					return
				}
				if( req.method === 'POST' && req.path === '/api/items' ) {
					const body = req.body as { title?: string, body?: string }
					if( !body?.title ) {
						res.status( 400 ).json({ error: 'title required' })
						return
					}
					res.json( this.item_add({ title: body.title, body: body.body ?? '' }) )
					return
				}
				if( req.method === 'DELETE' && req.path.startsWith( '/api/items/' ) ) {
					const id = req.path.slice( '/api/items/'.length )
					res.json( this.item_delete( id ) )
					return
				}
				next()
			}
		}

	}

}
