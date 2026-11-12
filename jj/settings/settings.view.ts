namespace $.$$ {
	export class $bog_jj_settings extends $.$bog_jj_settings {

		@ $mol_mem
		store() {
			return this.$.$bog_jj_store.make({ $: this.$ })
		}

		editable() {
			return this.store().can_edit( this.blog_link() )
		}

		blog_land() {
			const blog = this.store().blog( this.blog_link() )
			return blog?.land() ?? null
		}

		blog_title( next?: string ) {
			return this.store().blog_title( this.blog_link(), next )
		}

		blog_about( next?: string ) {
			return this.store().blog_about( this.blog_link(), next )
		}

		socials_text( next?: string ) {
			return this.store().blog_socials( this.blog_link(), next )
		}

		account_lord() {
			return this.store().my_lord()
		}

		public_link() {
			return this.store().blog_public_link( this.blog_link() )
		}

		image_title( key: string ) {
			return key === 'Avatar' ? this.Avatar_title() : this.Cover_title()
		}

		image_pick_text( key: string ) {
			return this.Pick()
		}

		image_drop_text( key: string ) {
			return this.Cover_drop()
		}

		image_link( key: string ) {
			return key === 'Avatar'
				? this.store().blog_avatar( this.blog_link() )
				: this.store().blog_cover( this.blog_link() )
		}

		image_filled( key: string ) {
			return Boolean( this.image_link( key ) )
		}

		image_rows( key: string ) {
			return [ this.Image_title( key ), this.Image_preview( key ), this.Image_actions( key ) ]
		}

		image_actions_rows( key: string ) {
			const rows = [ this.Image_pick( key ) ] as any[]
			if( this.image_filled( key ) ) rows.push( this.Image_drop( key ) )
			return rows
		}

		image_preview_style( key: string ) {
			const url = this.store().photo().url( this.image_link( key ) )
			const round = key === 'Avatar'
			return {
				backgroundImage: url ? `url("${ url }")` : 'none',
				width: round ? '8rem' : '16rem',
				height: '8rem',
				... round ? { borderRadius: '50%' } : {},
				... url ? {} : { border: '1px dashed var(--mol_theme_line)' },
			}
		}

		@ $mol_action
		image_add( key: string, files?: readonly File[] ) {
			const file = files?.[ 0 ]
			if( file && this.editable() ) this.image_save( key, file )
			return []
		}

		image_list( key: string, creating: boolean ) {
			const blog = this.store().blog( this.blog_link() )
			if( !blog ) return null
			if( key === 'Avatar' ) return blog.Avatar( creating ? 'auto' : undefined ) ?? null
			return blog.Cover( creating ? 'auto' : undefined ) ?? null
		}

		async image_save( key: string, file: File ) {
			const list = this.image_list( key, true )
			if( !list ) return
			const old = list.items()
			await this.$.$mol_wire_async( this.store().photo() ).save([ file ], list )
			for( const link of old ) list.cut( link )
		}

		@ $mol_action
		image_drop( key: string ) {
			const list = this.image_list( key, false )
			for( const link of list?.items() ?? [] ) list!.cut( link )
		}

	}
}
