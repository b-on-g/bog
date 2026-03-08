namespace $.$$ {

	export class $bog_ui_app_breadcrumb extends $.$bog_ui_app_breadcrumb {

		short_crumbs() {
			return [ 'home', 'products' ]
		}

		long_crumbs() {
			return [ 'home', 'catalog', 'electronics', 'phones', 'iphone' ]
		}

		Short() {
			const short = super.Short()
			short.crumb_title = ( id: string ) => {
				const titles: Record< string, string > = {
					home: 'Home',
					products: 'Products',
				}
				return titles[ id ] ?? id
			}
			short.crumb_uri = ( id: string ) => {
				return id === 'home' ? '#' : ''
			}
			return short
		}

		Long() {
			const long = super.Long()
			long.crumb_title = ( id: string ) => {
				const titles: Record< string, string > = {
					home: 'Home',
					catalog: 'Catalog',
					electronics: 'Electronics',
					phones: 'Phones',
					iphone: 'iPhone 15 Pro',
				}
				return titles[ id ] ?? id
			}
			long.crumb_uri = ( id: string ) => {
				return id === 'iphone' ? '' : '#'
			}
			return long
		}

	}

}
