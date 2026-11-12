namespace $ {

	export class $bog_jj_store extends $mol_object {

		home() {
			return this.$.$giper_baza_glob.home( $bog_jj_domain_home as any ) as $bog_jj_domain_home
		}

		@ $mol_mem
		photo() {
			return this.$.$bog_jj_photo.make({ $: this.$ })
		}

		@ $mol_mem
		blogs(): readonly $bog_jj_domain_blog[] {
			return this.home().Blogs()?.remote_list() ?? []
		}

		@ $mol_mem_key
		blog_title( link: string, next?: string ): string {
			const blog = this.blog( link )
			if( !blog ) return ''
			return blog.Title( next === undefined ? undefined : 'auto' )?.val( next ) ?? ''
		}

		@ $mol_mem_key
		blog_about( link: string, next?: string ): string {
			const blog = this.blog( link )
			if( !blog ) return ''
			return blog.About( next === undefined ? undefined : 'auto' )?.val( next ) ?? ''
		}

		@ $mol_mem_key
		blog_socials( link: string, next?: string ): string {
			const blog = this.blog( link )
			if( !blog ) return ''
			const list = blog.Socials( next === undefined ? undefined : 'auto' )
			if( next === undefined ) return list?.items().join( '\n' ) ?? ''
			const items = next.split( /[\s,]+/ ).map( item => item.trim() ).filter( Boolean )
			list?.items( items )
			return next
		}

		blog_public_link( link: string ) {
			return this.blog( link )?.Public()?.val()?.str ?? ''
		}

		blog_avatar( link: string ) {
			return $bog_jj_domain_image( this.blog( link )?.Avatar() ?? null )
		}

		blog_cover( link: string ) {
			return $bog_jj_domain_image( this.blog( link )?.Cover() ?? null )
		}

		@ $mol_mem_key
		blog_posts_count( link: string ) {
			return this.published( link ).length
		}

		blog( link: string ) {
			if( !link ) return null
			const parsed = $giper_baza_link.check( link )
			if( !parsed ) return null
			const land = this.$.$giper_baza_glob.Land( parsed.land() )
			return land.Data( $bog_jj_domain_blog )
		}

		blog_of_post( post: $bog_jj_domain_post ) {
			const land = this.$.$giper_baza_glob.Land( post.link().land() )
			return land.Data( $bog_jj_domain_blog )
		}

		public_land( blog: $bog_jj_domain_blog ) {
			return blog.Public()?.remote() ?? null
		}

		public_of_post( post: $bog_jj_domain_post ) {
			return this.public_land( this.blog_of_post( post ) )
		}

		@ $mol_mem_key
		posts( blog_link: string ): readonly $bog_jj_domain_post[] {
			const blog = this.blog( blog_link )
			if( !blog ) return []
			return blog.Posts()?.remote_list() ?? []
		}

		@ $mol_mem_key
		published( blog_link: string ): readonly $bog_jj_domain_post[] {
			return this.posts( blog_link )
				.filter( post => post.Published()?.val() )
				.sort( ( left, right )=> ( right.Created()?.val()?.valueOf() ?? 0 ) - ( left.Created()?.val()?.valueOf() ?? 0 ) )
		}

		post( link: string ) {
			const parsed = $giper_baza_link.check( link )
			if( !parsed ) return null
			return this.$.$giper_baza_glob.Pawn( parsed, $bog_jj_domain_post )
		}

		rich( post: $bog_jj_domain_post ) {
			return post.Body()?.remote() ?? null
		}

		@ $mol_mem_key
		post_title( link: string, next?: string ): string {
			const post = this.post( link )
			if( !post ) return ''
			return post.Title( next === undefined ? undefined : 'auto' )?.val( next ) ?? ''
		}

		@ $mol_mem_key
		post_tags( link: string, next?: readonly string[] ): readonly string[] {
			const post = this.post( link )
			if( !post ) return []
			return post.Tags( next === undefined ? undefined : 'auto' )?.items( next ) ?? []
		}

		@ $mol_mem_key
		post_published( link: string, next?: boolean ): boolean {
			const post = this.post( link )
			if( !post ) return false
			return post.Published( next === undefined ? undefined : 'auto' )?.val( next ) ?? false
		}

		@ $mol_action
		post_publish( link: string, next: boolean ) {
			this.post_published( link, next )
		}

		post_created( link: string ) {
			return this.post( link )?.Created()?.val() ?? null
		}

		post_excerpt( link: string ) {
			const post = this.post( link )
			if( !post ) return ''
			const body = this.rich( post )
			if( !body ) return ''
			return $bog_jj_domain_excerpt( body.html() )
		}

		post_cover( link: string ) {
			return $bog_jj_domain_image( this.post( link )?.Cover() ?? null )
		}

		@ $mol_mem_key
		comments( post_link: string ): readonly $bog_jj_domain_comment[] {
			const post = this.post( post_link )
			if( !post ) return []
			const land = this.public_of_post( post )
			if( !land ) return []
			const list = land.Comments()?.key( post_link )
			return list?.remote_list() ?? []
		}

		@ $mol_mem_key
		comment_text( link: string ) {
			return this.$.$giper_baza_glob.Pawn( new this.$.$giper_baza_link( link ), $bog_jj_domain_comment ).Text()?.val() ?? ''
		}

		@ $mol_mem_key
		comment_author( link: string ) {
			return this.$.$giper_baza_glob.Pawn( new this.$.$giper_baza_link( link ), $bog_jj_domain_comment ).Author()?.val() ?? ''
		}

		@ $mol_mem_key
		comment_parent( link: string ) {
			return this.$.$giper_baza_glob.Pawn( new this.$.$giper_baza_link( link ), $bog_jj_domain_comment ).Parent()?.val() ?? ''
		}

		@ $mol_mem_key
		comment_created( link: string ) {
			return this.$.$giper_baza_glob.Pawn( new this.$.$giper_baza_link( link ), $bog_jj_domain_comment ).Created()?.val() ?? null
		}

		@ $mol_mem_key
		comment_tree( post_link: string ): $bog_jj_domain_tree {
			return $bog_jj_domain_tree( this.comments( post_link ).map( comment => ({
				link: comment.link().str,
				parent: comment.Parent()?.val() ?? '',
			}) ) )
		}

		@ $mol_mem_key
		likes( post_link: string ): readonly string[] {
			const post = this.post( post_link )
			if( !post ) return []
			const land = this.public_of_post( post )
			if( !land ) return []
			return land.Likes()?.key( post_link )?.items() ?? []
		}

		@ $mol_mem
		my_lord() {
			return this.$.$giper_baza_auth.current().pass().lord().str
		}

		liked( post_link: string ) {
			return this.likes( post_link ).includes( this.my_lord() )
		}

		@ $mol_mem_key
		subs( blog_link: string, next?: boolean ): boolean {
			const list = this.home().Subs( next === undefined ? undefined : 'auto' )
			if( !list ) return false
			if( next === undefined ) return list.has( blog_link )
			list.has( blog_link, next )
			return next
		}

		@ $mol_mem
		feed(): readonly $bog_jj_domain_post[] {
			const links = [
				... this.blogs().map( blog => blog.link().str ),
				... this.home().Subs()?.items() ?? [],
			]
			const unique = [ ... new Set( links ) ]
			return unique
				.flatMap( link => this.published( link ) )
				.sort( ( left, right )=> ( right.Created()?.val()?.valueOf() ?? 0 ) - ( left.Created()?.val()?.valueOf() ?? 0 ) )
				.slice( 0, 100 )
		}

		@ $mol_mem
		tags(): readonly string[] {
			return [ ... new Set( this.feed().flatMap( post => post.Tags()?.items() ?? [] ) ) ].sort()
		}

		@ $mol_action
		blog_create( title: string ) {
			const glob = this.$.$giper_baza_glob
			const land = glob.land_grab([[ null, this.$.$giper_baza_rank_read ]])

			const blog = land.Data( $bog_jj_domain_blog )
			blog.Title( 'auto' )!.val( title || 'Без названия' )
			blog.Created( 'auto' )!.val( new this.$.$mol_time_moment )

			const public_land = glob.land_grab([[ null, this.$.$giper_baza_rank_post( 'fast' ) ]])
			blog.Public( 'auto' )!.remote( public_land.Data( $bog_jj_domain_public ) )

			this.home().Blogs( 'auto' )!.remote_add( blog )

			return blog.link().str
		}

		@ $mol_action
		post_add( blog_link: string ) {
			const blog = this.blog( blog_link )
			if( !blog ) return ''
			const post = blog.Posts( null )!.make( null )
			post.Title( 'auto' )!.val( '' )
			post.Created( 'auto' )!.val( new this.$.$mol_time_moment )
			post.Published( 'auto' )!.val( false )
			post.Body( 'auto' )!.ensure( null )
			return post.link().str
		}

		@ $mol_action
		post_drop( blog_link: string, post_link: string ) {
			const blog = this.blog( blog_link )
			if( !blog ) return
			const link = new this.$.$giper_baza_link( post_link )
			blog.Posts()?.cut( link )
		}

		@ $mol_action
		comment_add( post_link: string, parent: string, text: string ) {
			const trimmed = text.trim()
			if( !trimmed ) return
			const post = this.post( post_link )
			if( !post ) return
			const land = this.public_of_post( post )
			if( !land ) return

			const list = land.Comments( 'auto' )!.key( post_link, 'auto' )!
			const comment = list.make( null )
			comment.Text( 'auto' )!.val( trimmed )
			comment.Parent( 'auto' )!.val( parent )
			comment.Author( 'auto' )!.val( this.my_lord() )
			comment.Created( 'auto' )!.val( new this.$.$mol_time_moment )
		}

		@ $mol_action
		comment_drop( post_link: string, comment_link: string ) {
			const post = this.post( post_link )
			if( !post ) return
			const land = this.public_of_post( post )
			if( !land ) return
			land.Comments()?.key( post_link )?.cut( new this.$.$giper_baza_link( comment_link ) )
		}

		@ $mol_action
		like_toggle( post_link: string ) {
			const post = this.post( post_link )
			if( !post ) return
			const land = this.public_of_post( post )
			if( !land ) return
			const list = land.Likes( 'auto' )!.key( post_link, 'auto' )!
			list.has( this.my_lord(), !list.has( this.my_lord() ) )
		}

		@ $mol_action
		subscribe_toggle( blog_link: string ) {
			this.subs( blog_link, !this.subs( blog_link ) )
		}

		can_edit( blog_link: string ) {
			return this.blog( blog_link )?.can_change() ?? false
		}

	}

}
