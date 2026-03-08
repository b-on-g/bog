namespace $.$$ {

	export class $bog_ui_app_toast extends $.$bog_ui_app_toast {

		@ $mol_action
		add_info( next?: any ) {
			if( next !== undefined ) {
				const m = this.Manager() as $$.$bog_ui_toast_manager
				m.add( 'This is an informational message.', 'info' )
			}
			return null
		}

		@ $mol_action
		add_success( next?: any ) {
			if( next !== undefined ) {
				const m = this.Manager() as $$.$bog_ui_toast_manager
				m.add( 'Operation completed successfully!', 'success' )
			}
			return null
		}

		@ $mol_action
		add_warning( next?: any ) {
			if( next !== undefined ) {
				const m = this.Manager() as $$.$bog_ui_toast_manager
				m.add( 'Please check your input carefully.', 'warning' )
			}
			return null
		}

		@ $mol_action
		add_error( next?: any ) {
			if( next !== undefined ) {
				const m = this.Manager() as $$.$bog_ui_toast_manager
				m.add( 'Something went wrong. Try again.', 'error' )
			}
			return null
		}

	}

}
