namespace $.$$ {
	export class $bog_ui_breadcrumb extends $.$bog_ui_breadcrumb {

		items() {
			const crumbs = this.crumbs()
			if( !crumbs.length ) return []

			const items = [] as $mol_view[]

			for( let i = 0; i < crumbs.length - 1; i++ ) {
				items.push( this.Crumb( crumbs[i] ) )
				items.push( this.Sep( crumbs[i] ) )
			}

			items.push( this.Last() )

			return items
		}

		last_title() {
			const crumbs = this.crumbs()
			if( !crumbs.length ) return ''
			return this.crumb_title( crumbs[ crumbs.length - 1 ] )
		}

	}
}
