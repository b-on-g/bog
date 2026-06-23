namespace $.$$ {

	export class $bog_sample extends $.$bog_sample {

		static {
			$bog_builderui_router.activate()
		}

		page() {
			return this.$.$mol_state_arg.value( 'page' ) ?? 'home'
		}

		@ $mol_mem
		pages() {
			const p = this.page()
			if( p === 'about' ) return [ this.About() ]
			if( p === 'posts' ) return [ this.Posts() ]
			return [ this.Home() ]
		}

		@ $mol_mem
		meta(): $bog_meta_data {
			const p = this.page()
			if( p === 'about' ) return {
				title: 'About — Sample',
				description: 'About page of demo app',
				og_title: 'About — Sample',
				og_type: 'article',
			}
			if( p === 'posts' ) return {
				title: 'Posts — Sample',
				description: 'List of demo posts',
				og_title: 'Posts — Sample',
				og_type: 'website',
			}
			return {
				title: 'Sample — Demo',
				description: 'Demo sample app for $bog_seo',
				og_title: 'Sample — Demo',
				og_type: 'website',
			}
		}

		override attr() {
			return { ... super.attr(), ... $bog_meta_attr( this ) }
		}

		api_base() {
			return this.$.$mol_state_arg.value( 'api' ) ?? 'http://localhost:9091'
		}

		@ $mol_mem
		api_posts(): readonly $bog_sample_post[] {
			return this.$.$mol_fetch.json( `${ this.api_base() }/api/posts` ) as readonly $bog_sample_post[]
		}

		posts_rows() {
			return this.api_posts().map( post => this.Post_row( post.id ) )
		}

		post_title( id: string ) {
			return this.api_posts().find( p => p.id === id )?.title ?? ''
		}

		post_body( id: string ) {
			return this.api_posts().find( p => p.id === id )?.body ?? ''
		}

	}

}
