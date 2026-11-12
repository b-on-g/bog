namespace $.$$ {
	export class $bog_jj_blog extends $.$bog_jj_blog {

		@ $mol_mem
		store() {
			return this.$.$bog_jj_store.make({ $: this.$ })
		}

		hero_rows() {
			const rows = [] as any[]
			if( this.store().blog_cover( this.blog_link() ) ) rows.push( this.Hero_cover() )
			rows.push( this.Hero_content() )
			return rows
		}

		hero_content_rows() {
			const rows = [] as any[]
			if( this.store().blog_avatar( this.blog_link() ) ) rows.push( this.Hero_avatar() )
			rows.push( this.Hero_info() )
			return rows
		}

		hero_info_rows() {
			const rows = [ this.Blog_title() ] as any[]
			if( this.blog_about() ) rows.push( this.Blog_about() )
			if( this.meta_text() ) rows.push( this.Blog_meta() )
			if( this.social_links().length ) rows.push( this.Socials() )
			return rows
		}

		hero_info_style() {
			if( !this.store().blog_cover( this.blog_link() ) ) return {}
			return {
				color: '#fff',
				textShadow: '0 1px 3px rgba(0,0,0,.8)',
			}
		}

		blog_title() {
			return this.store().blog_title( this.blog_link() ) || this.blog_link().slice( 0, 8 )
		}

		title() {
			return this.blog_title()
		}

		blog_about() {
			return this.store().blog_about( this.blog_link() )
		}

		editable() {
			return this.store().can_edit( this.blog_link() )
		}

		tools_rows() {
			if( !this.editable() ) return [ this.Subscribe_button() ]
			return [ this.Subscribe_button(), this.New(), this.Settings_link() ]
		}

		posts_rows() {
			const rows = [ this.Posts_head() ] as any[]
			if( this.cards().length ) rows.push( this.Cards() )
			else rows.push( this.Posts_empty_view() )
			return rows
		}

		subscribed() {
			return this.blog_link() ? this.store().subs( this.blog_link() ) : false
		}

		subscribed_known() {
			return Boolean( this.blog_link() )
		}

		subscribe_text() {
			return this.subscribed() ? this.Subscribed() : this.Subscribe()
		}

		subscribe_hint() {
			return this.subscribe_text()
		}

		@ $mol_action
		subscribe_toggle() {
			if( !this.blog_link() ) return
			this.store().subscribe_toggle( this.blog_link() )
		}

		@ $mol_action
		new_post() {
			const link = this.store().post_add( this.blog_link() )
			if( !link ) return
			this.$.$mol_state_arg.value( 'post', link )
			this.$.$mol_state_arg.value( 'blog', null )
			this.$.$mol_state_arg.value( 'edit', '' )
		}

		cover_style() {
			const url = this.store().photo().url( this.store().blog_cover( this.blog_link() ) )
			if( !url ) return { backgroundImage: 'none' }
			return {
				backgroundImage: `linear-gradient(rgba(0,0,0,.05), rgba(0,0,0,.65)), url("${ url }")`,
			}
		}

		avatar_style() {
			const url = this.store().photo().url( this.store().blog_avatar( this.blog_link() ) )
			return { backgroundImage: url ? `url("${ url }")` : 'none' }
		}

		meta_text() {
			const count = this.store().blog_posts_count( this.blog_link() )
			return count ? `${ this.Posts_title() }: ${ count }` : ''
		}

		social_links() {
			const blog = this.store().blog( this.blog_link() )
			return ( blog?.Socials()?.items() ?? [] ).map( uri => this.Social_link( uri ) )
		}

		social_uri( uri: string ) {
			return uri
		}

		social_title( uri: string ) {
			try {
				return new URL( uri ).hostname.replace( /^www\./, '' )
			} catch {
				return uri
			}
		}

		cards() {
			const posts = this.editable()
				? this.store().posts( this.blog_link() )
				: this.store().published( this.blog_link() )
			return posts.map( post => this.Card( post.link().str ) )
		}

		card_post( link: string ) {
			return link
		}

		@ $mol_action
		tag_select( tag: string ) {
			this.$.$mol_state_arg.value( 'tag', tag )
		}

	}
}
