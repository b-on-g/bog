namespace $.$$ {

	export class $bog_ui_sidebar extends $.$bog_ui_sidebar {

		@ $mol_mem
		items_with_collapsed() {
			const collapsed = this.mode() === 'rail'
			return this.items().map( item => {
				if( item instanceof $bog_ui_sidebar_item ) {
					item.collapsed( collapsed )
				}
				return item
			} )
		}

		@ $mol_action
		toggle( next?: any ) {
			if( next !== undefined ) {
				this.mode(
					this.mode() === 'dock' ? 'rail' : 'dock'
				)
			}
			return null
		}

	}

}
