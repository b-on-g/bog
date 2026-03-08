namespace $.$$ {

	export class $bog_ui_app_overview extends $.$bog_ui_app_overview {

		@ $mol_action
		go_badge( next?: any ) {
			if( next !== undefined ) $mol_state_arg.value( 'component', 'badge' )
			return null
		}

		@ $mol_action
		go_empty( next?: any ) {
			if( next !== undefined ) $mol_state_arg.value( 'component', 'empty' )
			return null
		}

		@ $mol_action
		go_skeleton( next?: any ) {
			if( next !== undefined ) $mol_state_arg.value( 'component', 'skeleton' )
			return null
		}

		@ $mol_action
		go_breadcrumb( next?: any ) {
			if( next !== undefined ) $mol_state_arg.value( 'component', 'breadcrumb' )
			return null
		}

		@ $mol_action
		go_sidebar( next?: any ) {
			if( next !== undefined ) $mol_state_arg.value( 'component', 'sidebar' )
			return null
		}

		@ $mol_action
		go_sheet( next?: any ) {
			if( next !== undefined ) $mol_state_arg.value( 'component', 'sheet' )
			return null
		}

		@ $mol_action
		go_toast( next?: any ) {
			if( next !== undefined ) $mol_state_arg.value( 'component', 'toast' )
			return null
		}

		@ $mol_action
		go_command( next?: any ) {
			if( next !== undefined ) $mol_state_arg.value( 'component', 'command' )
			return null
		}

		@ $mol_action
		go_table( next?: any ) {
			if( next !== undefined ) $mol_state_arg.value( 'component', 'table' )
			return null
		}

	}

}
