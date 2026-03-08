namespace $.$$ {

	interface $bog_ui_toast_data {
		id: string
		message: string
		type: string
	}

	export class $bog_ui_toast_manager extends $.$bog_ui_toast_manager {

		@ $mol_mem
		toast_data( next?: readonly $bog_ui_toast_data[] ): readonly $bog_ui_toast_data[] {
			return next ?? []
		}

		add( message: string, type: string = 'info' ) {
			const id = String( Date.now() ) + String( Math.random() ).slice( 2, 8 )
			const data = this.toast_data()
			this.toast_data([ ...data, { id, message, type } ])
		}

		remove( id: string ) {
			this.toast_data( this.toast_data().filter( t => t.id !== id ) )
		}

		toast_views() {
			return this.toast_data().slice( -5 ).map( t => this.Toast( t.id ) )
		}

		toast_message( id: string ) {
			return this.toast_data().find( t => t.id === id )?.message ?? ''
		}

		toast_type( id: string ) {
			return this.toast_data().find( t => t.id === id )?.type ?? 'info'
		}

		@ $mol_mem_key
		toast_close( id: string, next?: any ) {
			if( next !== undefined ) {
				this.remove( id )
			}
			return null
		}

	}

}
