namespace $.$$ {

	export class $bog_docs_editor extends $.$bog_docs_editor {

		@$mol_mem
		transpiled() {
			const source = this.source()
			if ( !source.trim() ) return ''

			const tree = this.$.$mol_tree2_from_string( source, 'editor.view.tree' )
			const js_tree = this.$.$mol_view_tree2_to_js( tree )
			const js_text = this.$.$mol_tree2_js_to_text( js_tree )
			return this.$.$mol_tree2_text_to_string( js_text )
		}

		@$mol_mem
		override preview_text() {
			try {
				const js = this.transpiled()
				if ( !js ) return ''
				return '```javascript\n' + js + '```'
			} catch ( error: any ) {
				if ( error instanceof Promise ) throw error
				return '> **Error:** ' + String( error.message || error )
			}
		}

	}

}
