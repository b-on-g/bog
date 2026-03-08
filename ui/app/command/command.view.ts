namespace $.$$ {

	export class $bog_ui_app_command extends $.$bog_ui_app_command {

		@ $mol_action
		open_palette( next?: any ) {
			if( next !== undefined ) {
				this.palette_showed( true )
			}
			return null
		}

	}

}
