namespace $.$$ {

	export class $bog_docs_play extends $.$bog_docs_play {

		@$mol_mem
		source( next?: string ) {
			if ( next !== undefined ) return next

			const hash = location.hash.replace( /^#!?/, '' )
			const params = new URLSearchParams( hash )
			const code_param = params.get( 'code' )

			if ( code_param ) {
				try {
					const base64 = code_param.replace( /-/g, '+' ).replace( /_/g, '/' )
					const binary = atob( base64 )
					const bytes = Uint8Array.from( binary, c => c.charCodeAt( 0 ) )
					return new TextDecoder().decode( bytes )
				} catch {
					// Invalid code param, fall through to default
				}
			}

			return this.preset_code_hello()
		}

		preset_code_hello() {
			const d = '$'
			return [
				d + 'my_hello ' + d + 'mol_view',
				'\tsub /',
				'\t\t\\Hello World!',
			].join( '\n' )
		}

		preset_code_counter() {
			const d = '$'
			return [
				d + 'my_counter ' + d + 'mol_page',
				'\ttitle \\Counter',
				'\tbody /',
				'\t\t<= Count ' + d + 'mol_number',
				'\t\t\tvalue? <=> count? 0',
				'\t\t<= Reset_btn ' + d + 'mol_button_major',
				'\t\t\ttitle \\Reset',
				'\t\t\tclick? <=> reset? null',
			].join( '\n' )
		}

		preset_code_todo() {
			const d = '$'
			return [
				d + 'my_todo ' + d + 'mol_page',
				'\ttitle \\Todo List',
				'\ttools /',
				'\t\t<= Add_btn ' + d + 'mol_button_minor',
				'\t\t\ttitle \\Add',
				'\t\t\tclick? <=> add? null',
				'\tbody /',
				'\t\t<= Input ' + d + 'mol_string',
				'\t\t\tvalue? <=> task_text? \\',
				'\t\t\thint \\New task...',
				'\t\t<= List ' + d + 'mol_list',
				'\t\t\trows <= items /',
			].join( '\n' )
		}

		@$mol_action
		preset_hello( next?: any ) {
			this.source( this.preset_code_hello() )
		}

		@$mol_action
		preset_counter( next?: any ) {
			this.source( this.preset_code_counter() )
		}

		@$mol_action
		preset_todo( next?: any ) {
			this.source( this.preset_code_todo() )
		}

		@$mol_action
		share( next?: any ) {
			const code = this.source()
			const bytes = new TextEncoder().encode( code )
			const binary = Array.from( bytes, b => String.fromCharCode( b ) ).join( '' )
			const encoded = btoa( binary )
				.replace( /\+/g, '-' )
				.replace( /\//g, '_' )
				.replace( /=+$/, '' )

			const base = location.href.replace( /#.*/, '' )
			const url = base + '#!page=play&code=' + encoded

			navigator.clipboard?.writeText( url )
		}

	}

}
