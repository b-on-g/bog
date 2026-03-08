namespace $.$$ {

	export class $bog_ui_app_sheet extends $.$bog_ui_app_sheet {

		@ $mol_action
		open_top( next?: any ) {
			if( next !== undefined ) this.top_showed( true )
			return null
		}

		@ $mol_action
		open_right( next?: any ) {
			if( next !== undefined ) this.right_showed( true )
			return null
		}

		@ $mol_action
		open_bottom( next?: any ) {
			if( next !== undefined ) this.bottom_showed( true )
			return null
		}

		@ $mol_action
		open_left( next?: any ) {
			if( next !== undefined ) this.left_showed( true )
			return null
		}

	}

}
