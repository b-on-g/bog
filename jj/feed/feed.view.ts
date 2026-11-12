namespace $.$$ {
	export class $bog_jj_feed extends $.$bog_jj_feed {

		@ $mol_mem
		store() {
			return this.$.$bog_jj_store.make({ $: this.$ })
		}

		@ $mol_mem
		creating( next?: boolean ) {
			return next ?? false
		}

		not_creating() {
			return !this.creating()
		}

		create_rows() {
			return this.creating() ? [ this.Create_form() ] : [ this.Create() ]
		}

		@ $mol_action
		create_toggle() {
			this.creating( !this.creating() )
		}

		create_title( next?: string ) {
			return this.$.$mol_state_local.value( `${ this }.create_title`, next ) ?? ''
		}

		@ $mol_action
		create() {
			const title = this.create_title().trim()
			if( !title ) return
			const link = this.store().blog_create( title )
			this.create_title( '' )
			this.creating( false )
			this.$.$mol_state_arg.value( 'blog', link )
			this.$.$mol_state_arg.value( 'post', null )
			this.$.$mol_state_arg.value( 'tag', null )
		}

		my_blog_rows() {
			return this.store().blogs().map( blog => this.My_blog( blog.link().str ) )
		}

		my_blog_link( link: string ) {
			return link
		}

		my_blog_title( link: string ) {
			return this.store().blog_title( link ) || link.slice( 0, 8 )
		}

		my_blog_avatar_style( link: string ) {
			const url = this.store().photo().url( this.store().blog_avatar( link ) )
			return { backgroundImage: url ? `url("${ url }")` : 'none' }
		}

		tag_links() {
			return this.store().tags().slice( 0, 24 ).map( tag => this.Tag( tag ) )
		}

		tag_link( tag: string ) {
			return tag
		}

		tag_title( tag: string ) {
			return `#${ tag }`
		}

		cards() {
			const tag = this.tag()
			const query = this.search().trim().toLowerCase()
			const posts = this.store().feed().filter( post => {
				if( tag && !( post.Tags()?.items() ?? [] ).includes( tag ) ) return false
				if( !query ) return true
				const title = post.Title()?.val()?.toLowerCase() ?? ''
				const body = this.store().post_excerpt( post.link().str ).toLowerCase()
				return title.includes( query ) || body.includes( query )
			} )
			return posts.map( post => this.Card( post.link().str ) )
		}

		feed_empty() {
			return this.tag() || this.search().trim() ? this.Nothing_found() : this.Empty_hint()
		}

		feed_rows() {
			const rows = [ this.Feed_head() ] as any[]
			if( this.cards().length ) rows.push( this.Cards() )
			else rows.push( this.Empty() )
			return rows
		}

		card_post( link: string ) {
			return link
		}

		card_blog( link: string ) {
			return this.store().post( link )?.link().land().str ?? ''
		}

		@ $mol_action
		tag_select( tag: string ) {
			this.$.$mol_state_arg.value( 'tag', tag )
		}

	}
}
