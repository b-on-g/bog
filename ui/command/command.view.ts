namespace $.$$ {

	export class $bog_ui_command extends $.$bog_ui_command {

		@ $mol_action
		backdrop_click( next?: any ) {
			if( next !== undefined ) {
				this.showed( false )
			}
			return null
		}

		@ $mol_mem
		filtered() {
			const q = this.query().trim().toLowerCase()
			const commands = this.commands()
			if( !q ) return commands
			return commands.filter( ( cmd: any ) => {
				if( cmd instanceof $bog_ui_command_group ) return false
				if( cmd instanceof $bog_ui_command_item ) {
					return cmd.label().toLowerCase().includes( q )
				}
				return false
			} )
		}

		@ $mol_mem
		result_rows() {
			const q = this.query().trim().toLowerCase()
			if( !q ) return this.commands()

			const filtered = this.filtered()
			if( filtered.length === 0 ) return []

			return filtered
		}

		@ $mol_action
		key_down( event?: KeyboardEvent ) {
			if( !event ) return null

			const key = event.key

			if( key === 'Escape' ) {
				event.preventDefault()
				this.showed( false )
				return null
			}

			const items = this.filtered().filter(
				( cmd: any ) => cmd instanceof $bog_ui_command_item
			)
			if( items.length === 0 ) return null

			const sel = this.selected()

			if( key === 'ArrowDown' ) {
				event.preventDefault()
				this.selected( ( sel + 1 ) % items.length )
				return null
			}

			if( key === 'ArrowUp' ) {
				event.preventDefault()
				this.selected( ( sel - 1 + items.length ) % items.length )
				return null
			}

			if( key === 'Enter' ) {
				event.preventDefault()
				const item = items[ sel ] as $bog_ui_command_item | undefined
				if( item ) item.execute( event )
				this.showed( false )
				return null
			}

			return null
		}

		@ $mol_mem
		selected( next?: number ) {
			this.query()
			return next ?? 0
		}

	}

}
