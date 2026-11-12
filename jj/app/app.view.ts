namespace $.$$ {
	export class $bog_jj_app extends $.$bog_jj_app {

		@ $mol_mem
		store() {
			return this.$.$bog_jj_store.make({ $: this.$ })
		}

		@ $mol_mem
		search( next?: string ) {
			return this.$.$mol_state_arg.value( 'search', next === undefined ? undefined : next || null ) ?? ''
		}

		blog_link( next?: string | null ) {
			return this.$.$mol_state_arg.value( 'blog', next ) ?? ''
		}

		post_link( next?: string | null ) {
			return this.$.$mol_state_arg.value( 'post', next ) ?? ''
		}

		tag_link( next?: string | null ) {
			return this.$.$mol_state_arg.value( 'tag', next ) ?? ''
		}

		settings_open() {
			return this.$.$mol_state_arg.value( 'settings' ) !== null
		}

		post_blog_link( link: string ) {
			return this.store().post( link )?.link().land().str ?? ''
		}

		settings_blog( link: string ) {
			return link
		}

		pages() {
			if( this.post_link() ) return [ this.Post( this.post_link() ) ]
			if( this.settings_open() && this.blog_link() ) return [ this.Settings( this.blog_link() ) ]
			if( this.blog_link() ) return [ this.Blog( this.blog_link() ) ]
			return [ this.Feed() ]
		}

		tag_text() {
			const tag = this.tag_link()
			return tag ? `#${ tag }` : ''
		}

		tag_current() {
			return this.tag_link()
		}

		nav_rows() {
			const rows = [ this.Home_link() ] as any[]
			if( this.tag_link() ) rows.push( this.Tag_label() )
			rows.push( this.Account() )
			return rows
		}

		account_text() {
			return this.store().my_lord().slice( 0, 8 )
		}

		title() {
			const post_title = this.post_link() && this.store().post_title( this.post_link() )
			if( post_title ) return post_title
			const blog_title = this.blog_link() && this.store().blog_title( this.blog_link() )
			if( blog_title ) return blog_title
			return super.title()
		}

		auto() {
			return [ this.store().home() ]
		}

	}
}
