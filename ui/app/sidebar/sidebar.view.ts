namespace $.$$ {

	export class $bog_ui_app_sidebar extends $.$bog_ui_app_sidebar {

		@ $mol_action
		set_dock( next?: any ) {
			if( next !== undefined ) this.preview_mode( 'dock' )
			return null
		}

		@ $mol_action
		set_rail( next?: any ) {
			if( next !== undefined ) this.preview_mode( 'rail' )
			return null
		}

		@ $mol_action
		set_hidden( next?: any ) {
			if( next !== undefined ) this.preview_mode( 'hidden' )
			return null
		}

		@ $mol_mem
		current_mode_text() {
			return `Current mode: ${ this.preview_mode() }`
		}

	}

}
