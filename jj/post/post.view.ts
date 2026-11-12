namespace $.$$ {
	export class $bog_jj_post extends $.$bog_jj_post {

		@ $mol_mem
		store() {
			return this.$.$bog_jj_store.make({ $: this.$ })
		}

		editing( next?: boolean ) {
			return this.$.$mol_state_arg.value( 'edit', next === undefined ? undefined : next ? '' : null ) !== null
		}

		is_editing() {
			return this.editing()
		}

		editable() {
			return this.Editable() && this.store().can_edit( this.blog_link() )
		}

		tools_rows() {
			if( !this.editable() ) return []
			return [ this.Edit_toggle(), this.Publish(), this.Delete() ]
		}

		article_rows() {
			const rows = [ this.Post_head() ]
			if( this.cover_filled() ) rows.unshift( this.Cover() )
			if( this.editing() ) {
				rows.push( this.Title_field(), this.Tags() )
			} else {
				rows.push( this.Title_text() )
				if( this.tags().length ) rows.push( this.Tags_text() )
			}
			rows.push( this.Body_editor(), this.Actions() )
			return rows
		}
		action_rows() {
			const rows = [ this.Like_button() ] as any[]
			if( this.editable() ) {
				rows.push( this.Cover_pick() )
				if( this.cover_filled() ) rows.push( this.Cover_remove() )
			}
			return rows
		}

		cover_box_style() {
			return this.store().post_cover( this.post_link() ) ? {} : { display: 'none' }
		}

		comment_form_rows() {
			const rows = [ this.Comment_input(), this.Comment_send_button() ] as any[]
			if( this.comment_parent() ) rows.push( this.Comment_cancel() )
			return rows
		}

		blog_title() {
			return this.store().blog_title( this.blog_link() )
		}

		author_avatar_style() {
			const url = this.store().photo().url( this.store().blog_avatar( this.blog_link() ) )
			return { backgroundImage: url ? `url("${ url }")` : 'none' }
		}

		title() {
			return this.store().post_title( this.post_link() ) || this.Untitled()
		}

		post_title( next?: string ) {
			return this.store().post_title( this.post_link(), next )
		}

		post_title_text() {
			return this.post_title() || this.Untitled()
		}

		tags( next?: readonly string[] ) {
			return this.store().post_tags( this.post_link(), next )
		}

		tag_dictionary() {
			return Object.fromEntries( this.store().tags().map( tag => [ tag, tag ] ) )
		}

		tag_links() {
			return this.tags().map( tag => this.Tag_link( tag ) )
		}

		tag_link_tag( tag: string ) {
			return tag
		}

		tag_link_title( tag: string ) {
			return `#${ tag }`
		}

		body_pawn() {
			const post = this.store().post( this.post_link() )
			return post ? this.store().rich( post ) : null
		}

		body_editor_style() {
			return { minHeight: this.editing() ? '20rem' : 'auto' }
		}

		date_text() {
			return $bog_jj_domain_date( this.store().post_created( this.post_link() ) )
		}

		state_text() {
			return this.store().post_published( this.post_link() )
				? this.Published_on()
				: this.Published_off()
		}

		cover_style() {
			const url = this.store().photo().url( this.store().post_cover( this.post_link() ) )
			return { backgroundImage: url ? `url("${ url }")` : 'none' }
		}

		cover_filled() {
			return Boolean( this.store().post_cover( this.post_link() ) )
		}

		@ $mol_action
		cover_add( files?: readonly File[] ) {
			const file = files?.[ 0 ]
			if( file && this.editable() ) this.cover_save( file )
			return []
		}

		async cover_save( file: File ) {
			const post = this.store().post( this.post_link() )
			if( !post ) return
			const list = post.Cover( 'auto' )!
			const old = list.items()
			await this.$.$mol_wire_async( this.store().photo() ).save([ file ], list )
			for( const link of old ) list.cut( link )
		}

		@ $mol_action
		cover_drop() {
			const post = this.store().post( this.post_link() )
			const list = post?.Cover()
			for( const link of list?.items() ?? [] ) list!.cut( link )
		}

		@ $mol_action
		publish() {
			if( !this.editable() ) return
			this.store().post_publish( this.post_link(), !this.store().post_published( this.post_link() ) )
		}

		@ $mol_action
		delete_ask() {
			this.delete_asked( true )
		}

		@ $mol_action
		delete_cancel() {
			this.delete_asked( false )
		}

		@ $mol_action
		delete() {
			if( !this.editable() ) return
			this.delete_asked( false )
			this.store().post_drop( this.blog_link(), this.post_link() )
			this.$.$mol_state_arg.value( 'post', null )
			this.$.$mol_state_arg.value( 'edit', null )
		}

		@ $mol_action
		like_toggle() {
			this.store().like_toggle( this.post_link() )
		}

		likes_text() {
			const count = this.store().likes( this.post_link() ).length
			return count ? String( count ) : ''
		}

		@ $mol_mem
		comment_draft( next?: string ) {
			return this.$.$mol_state_local.value( `${ this }.comment_draft`, next ) ?? ''
		}

		@ $mol_mem
		comment_parent( next?: string ) {
			return this.$.$mol_state_local.value( `${ this }.comment_parent`, next ) ?? ''
		}

		@ $mol_action
		comment_submit() {
			const text = this.comment_draft()
			if( !text.trim() ) return
			this.store().comment_add( this.post_link(), this.comment_parent(), text )
			this.comment_draft( '' )
			this.comment_parent( '' )
		}

		@ $mol_action
		comment_cancel() {
			this.comment_parent( '' )
		}

		@ $mol_action
		comment_reply( link: string ) {
			this.comment_parent( link )
		}

		@ $mol_action
		comment_drop_action( link: string ) {
			this.store().comment_drop( this.post_link(), link )
		}

		comment_rows() {
			const tree = this.store().comment_tree( this.post_link() )

			const flat = ( link: string ): string[] => [
				link,
				...( tree.children.get( link ) ?? [] ).flatMap( flat ),
			]

			const rows = [ this.Comments_head(), this.Comment_form() ] as any[]

			if( !tree.roots.length ) rows.push( this.Comments_empty_view() )

			for( const link of tree.roots.flatMap( flat ) ) rows.push( this.Comment( link ) )

			return rows
		}

		comment_text( link: string ) {
			return this.store().comment_text( link )
		}

		comment_author_link( link: string ) {
			return this.store().comment_author( link )
		}

		comment_date( link: string ) {
			return $bog_jj_domain_date( this.store().comment_created( link ) )
		}

		comment_mine( link: string ) {
			const author = this.store().comment_author( link )
			return author === this.store().my_lord() || this.editable()
		}

		comment_indent_style( link: string ) {
			const depth = this.store().comment_tree( this.post_link() ).depth.get( link ) ?? 0
			return { width: `${ Math.min( depth, 8 ) }rem` }
		}

	}
}
