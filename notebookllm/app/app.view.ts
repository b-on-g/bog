namespace $.$$ {

	function cosine( a: number[], b: number[] ) {
		let dot = 0, na = 0, nb = 0
		for( let i = 0; i < a.length; ++i ) {
			dot += a[i] * b[i]
			na += a[i] * a[i]
			nb += b[i] * b[i]
		}
		return dot / ( Math.sqrt( na ) * Math.sqrt( nb ) || 1 )
	}

	function chunk_text( text: string, size = 500, overlap = 100 ): string[] {
		const chunks: string[] = []
		const paragraphs = text.split( /\n\s*\n/ )
		let current = ''

		for( const para of paragraphs ) {
			if( current.length + para.length > size && current.length > 0 ) {
				chunks.push( current.trim() )
				current = current.slice( -overlap ) + '\n\n' + para
			} else {
				current = current ? current + '\n\n' + para : para
			}
		}

		if( current.trim() ) chunks.push( current.trim() )
		return chunks.length ? chunks : [ text ]
	}

	function compute_embedding( text: string ): number[] {
		const words = text.toLowerCase().replace( /[^\w\sа-яё]/g, '' ).split( /\s+/ )
		const dim = 256
		const vec = new Array( dim ).fill( 0 )

		for( const word of words ) {
			let hash = 0
			for( let i = 0; i < word.length; ++i ) {
				hash = ( ( hash << 5 ) - hash + word.charCodeAt( i ) ) | 0
			}
			for( let j = 0; j < 4; ++j ) {
				const idx = Math.abs( ( hash + j * 7919 ) % dim )
				vec[ idx ] += 1 / ( 1 + j * 0.5 )
			}
		}

		const norm = Math.sqrt( vec.reduce( ( s, v ) => s + v * v, 0 ) ) || 1
		return vec.map( v => v / norm )
	}

	export class $bog_notebookllm_app extends $.$bog_notebookllm_app {

		// ===== GIPER BAZA =====

		@ $mol_mem
		store() {
			return this.$.$giper_baza_glob.home( $bog_notebookllm_store )
		}

		// ===== WEBLLM ENGINE =====

		private _engine: any = null
		private _engine_loading = false

		engine(): any {
			return this._engine
		}

		engine_start() {

			if( this._engine_loading || this._engine ) return
			this._engine_loading = true

			this.model_status_text( 'Loading WebLLM runtime...' )

			const loader = $mol_import.module_async( 'https://esm.run/@mlc-ai/web-llm' )

			loader.then( ( webllm: any ) => {

				this.model_status_text( 'Loading model...' )

				const model_id = this.model_id()
				const base = globalThis.location.origin + '/bog/notebookllm/model/'

				const appConfig = {
					model_list: [
						{
							model: base,
							model_id: model_id,
							model_lib:
								'https://raw.githubusercontent.com/mlc-ai/binary-mlc-llm-libs/main/' +
								'web-llm-models/v0_2_80/Qwen2-1.5B-Instruct-q4f16_1-ctx4k_cs1k-webgpu.wasm',
							low_resource_required: true,
							required_features: [ 'shader-f16' ] as any,
							overrides: { context_window_size: 32768 },
						},
					],
					useIndexedDBCache: true,
				}

				return webllm.CreateMLCEngine(
					model_id,
					{
						appConfig,
						initProgressCallback: ( progress: any ) => {
							this.model_status_text( progress.text || `Loading: ${ Math.round( ( progress.progress || 0 ) * 100 ) }%` )
						},
					},
				)

			} ).then( ( eng: any ) => {

				this._engine = eng
				this.model_status_text( 'Model ready' )

			} ).catch( ( err: any ) => {

				this._engine_loading = false
				this.model_status_text( 'Error: ' + ( err?.message || String( err ) ) )

			} )
		}

		@ $mol_mem
		override model_status_text( next?: string ): string {
			return next ?? 'Initializing...'
		}

		override auto() {
			this.engine_start()
		}

		// ===== NOTEBOOK MANAGEMENT =====

		@ $mol_mem
		notebooks(): readonly $bog_notebookllm_notebook[] {
			return this.store().Notebooks()?.remote_list() ?? []
		}

		@ $mol_mem
		current_notebook(): $bog_notebookllm_notebook | null {
			return this.store().Current_notebook()?.remote() ?? null
		}

		@ $mol_action
		override notebook_add() {
			const notebooks_list = this.store().Notebooks( null )!
			const nb = notebooks_list.make( null )!
			nb.name( 'New notebook' )
			this.store().Current_notebook( null )!.remote( nb )
		}

		override notebook_rows() {
			return this.notebooks().map( ( _, i ) => this.Notebook_row( i ) )
		}

		@ $mol_mem_key
		override notebook_title( index: number ) {
			return this.notebooks()[ index ]?.name() ?? ''
		}

		@ $mol_action
		notebook_select( index: number ) {
			const nb = this.notebooks()[ index ]
			if( !nb ) return
			this.store().Current_notebook( null )!.remote( nb )
		}

		@ $mol_action
		notebook_delete( index: number ) {
			const nb = this.notebooks()[ index ]
			if( !nb ) return
			const current = this.current_notebook()
			this.store().Notebooks( null )!.cut( nb.link() )
			if( current && nb.link().toString() === current.link().toString() ) {
				this.store().Current_notebook( null )!.val( null )
			}
		}

		// ===== DOCUMENT MANAGEMENT =====

		@ $mol_mem
		current_docs(): readonly $bog_notebookllm_doc[] {
			return this.current_notebook()?.Docs()?.remote_list() ?? []
		}

		override doc_rows() {
			return this.current_docs().map( ( _, i ) => this.Doc_row( i ) )
		}

		@ $mol_mem_key
		override doc_name( index: number ) {
			return this.current_docs()[ index ]?.name() ?? ''
		}

		override doc_count_text() {
			const count = this.current_docs().length
			return count ? `${ count } doc${ count > 1 ? 's' : '' }` : ''
		}

		@ $mol_action
		doc_upload_click() {
			const input = this.$.$mol_dom.document.createElement( 'input' )
			input.type = 'file'
			input.accept = '.txt,.md,.csv,.json,.html,.xml,.log,.pdf'
			input.multiple = true

			input.onchange = () => {
				if( !input.files ) return
				Array.from( input.files ).forEach( file => {
					const reader = new FileReader()
					reader.onload = () => {
						const text = reader.result as string
						if( text ) this.add_document( file.name, text )
					}
					reader.onerror = () => {
						console.error( 'Failed to read file:', file.name )
					}
					reader.readAsText( file, 'utf-8' )
				} )
			}

			input.click()
		}

		@ $mol_action
		add_document( name: string, content: string ) {
			let nb = this.current_notebook()
			if( !nb ) {
				this.notebook_add()
				nb = this.current_notebook()
			}
			if( !nb ) return

			const chunks = chunk_text( content )
			const embeddings = chunks.map( chunk => compute_embedding( chunk ) )

			const docs_list = nb.Docs( null )!
			const doc = docs_list.make( null )!

			doc.name( name )
			doc.Content( null )!.val( content )
			doc.Chunks( null )!.splice( chunks )
			doc.embeddings_set( embeddings )
		}

		@ $mol_action
		doc_remove( index: number ) {
			const nb = this.current_notebook()
			if( !nb ) return

			const doc = this.current_docs()[ index ]
			if( !doc ) return

			nb.Docs( null )!.cut( doc.link() )
		}

		// ===== RAG RETRIEVAL =====

		retrieve( query: string, top_k = 5 ): string[] {
			const query_emb = compute_embedding( query )
			const scored: { chunk: string, score: number }[] = []

			for( const doc of this.current_docs() ) {
				const chunks = doc.Chunks()?.items() ?? []
				const embeddings = doc.embeddings()
				const name = doc.name() ?? ''

				for( let i = 0; i < chunks.length; ++i ) {
					if( embeddings[i] ) {
						scored.push({
							chunk: `[${ name }]: ${ chunks[i] }`,
							score: cosine( query_emb, embeddings[i] ),
						})
					}
				}
			}

			scored.sort( ( a, b ) => b.score - a.score )
			return scored.slice( 0, top_k ).map( s => s.chunk )
		}

		// ===== CHAT =====

		override dialog_title( next?: string | null ) {
			const nb = this.current_notebook()
			if( !nb ) return super.dialog_title()

			if( next !== undefined ) {
				nb.Dialog_title( null )!.val( next ?? '' )
			}
			return nb.Dialog_title()?.val() || super.dialog_title()
		}

		override digest( next?: string ) {
			const nb = this.current_notebook()
			if( !nb ) return ''

			if( next !== undefined ) {
				nb.Digest( null )!.val( next )
			}
			return nb.Digest()?.val() ?? ''
		}

		@ $mol_mem
		chat_messages(): readonly $bog_notebookllm_message[] {
			return this.current_notebook()?.Messages()?.remote_list() ?? []
		}

		override messages() {
			const msgs = this.chat_messages()
			return msgs
				.filter( m => m.Role()?.val() !== 'system' )
				.map( ( _, i ) => this.Message( i ) )
		}

		@ $mol_mem_key
		override message_text( index: number ): string {
			const visible = this.chat_messages().filter( m => m.Role()?.val() !== 'system' )
			const msg = visible[ index ]
			if( !msg ) return ''

			const role = msg.Role()?.val() ?? ''
			let text = msg.Content()?.val() ?? ''
			if( text[0] && '`#>|='.includes( text[0] ) ) text = '\n' + text
			const icon = role === 'assistant' ? '📓' : '🙂'
			return icon + ' ' + text
		}

		override prompt_text( next?: string ) {
			return this.$.$mol_state_session.value( 'notebookllm_prompt', next ) ?? ''
		}

		@ $mol_action
		override prompt_submit() {
			const text = this.prompt_text().trim()
			if( !text ) return

			const eng = this.engine()
			if( !eng ) {
				this.model_status_text( 'Model is still loading, please wait...' )
				return
			}

			if( !this.current_notebook() ) {
				this.notebook_add()
			}

			const nb = this.current_notebook()!
			const relevant = this.retrieve( text )
			const context = relevant.length > 0
				? 'Document context:\n\n' + relevant.join( '\n\n---\n\n' )
				: 'No documents loaded.'

			// Get existing messages for history
			const existing_msgs = this.chat_messages()
			const history: { role: string, content: string }[] = existing_msgs
				.filter( m => m.Role()?.val() !== 'system' )
				.map( m => ({
					role: m.Role()?.val() ?? 'user',
					content: m.Content()?.val() ?? '',
				}))

			const system_msg = {
				role: 'system',
				content: `You are a helpful assistant. Answer based on document context if available. Cite sources in [brackets].\n\n${ context }`,
			}

			const recent = history.slice( -6 )
			recent.push({ role: 'user', content: text })

			const full_history = [ system_msg, ...recent ]

			// Add user message to Giper Baza
			const messages_list = nb.Messages( null )!
			const user_msg = messages_list.make( null )!
			user_msg.Role( null )!.val( 'user' )
			user_msg.Content( null )!.val( text )

			this.prompt_text( '' )

			this.generate( eng, full_history, nb )
		}

		@ $mol_action
		generate( eng: any, messages: { role: string, content: string }[], nb: $bog_notebookllm_notebook ) {

			this.model_status_text( 'Generating...' )

			eng.chat.completions.create({
				messages: messages.map( ( m: any ) => ({ role: m.role, content: m.content }) ),
				temperature: 0.7,
				max_tokens: 512,
				repetition_penalty: 1.3,
			}).then( ( reply: any ) => {

				const response = reply.choices[0]?.message?.content ?? 'No response.'

				// Add assistant message to Giper Baza
				const messages_list = nb.Messages( null )!
				const assistant_msg = messages_list.make( null )!
				assistant_msg.Role( null )!.val( 'assistant' )
				assistant_msg.Content( null )!.val( response )

				// Update title if new notebook
				if( nb.name() === 'New notebook' ) {
					const short = response.slice( 0, 50 ).replace( /\n/g, ' ' )
					nb.name( short + '...' )
				}

				this.model_status_text( 'Model ready' )

			} ).catch( ( error: any ) => {

				const msg = error?.message || String( error )

				const messages_list = nb.Messages( null )!
				const err_msg = messages_list.make( null )!
				err_msg.Role( null )!.val( 'assistant' )
				err_msg.Content( null )!.val( 'Error: ' + msg )

				this.model_status_text( 'Error: ' + msg )

			} )
		}

		override reset() {
			const nb = this.current_notebook()
			if( !nb ) return

			// Clear messages
			const msgs = nb.Messages()?.remote_list() ?? []
			const msgs_list = nb.Messages( null )!
			for( const m of msgs ) {
				msgs_list.cut( m.link() )
			}

			nb.Digest( null )!.val( '' )
			nb.Dialog_title( null )!.val( '' )
		}

		override sources_info() {
			const docs = this.current_docs()
			if( docs.length === 0 ) {
				return 'No documents loaded.\nUpload .txt, .md, .csv, .json or .html files.'
			}
			const total_chunks = docs.reduce( ( s, d ) => ( d.Chunks()?.items()?.length ?? 0 ) + s, 0 )
			return `**${ docs.length }** document(s), **${ total_chunks }** chunks indexed.`
		}

	}

}
