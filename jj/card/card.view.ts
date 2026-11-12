namespace $.$$ {
	export class $bog_jj_card extends $.$bog_jj_card {

		@ $mol_mem
		store() {
			return this.$.$bog_jj_store.make({ $: this.$ })
		}

		title_text() {
			return this.store().post_title( this.post_link() ) || this.Untitled()
		}

		excerpt() {
			return this.store().post_excerpt( this.post_link() )
		}

		date_text() {
			return $bog_jj_domain_date( this.store().post_created( this.post_link() ) )
		}

		author_name() {
			return this.store().blog_title( this.blog_link() ) || this.blog_link().slice( 0, 8 )
		}

		likes_text() {
			const count = this.store().likes( this.post_link() ).length
			return count ? String( count ) : ''
		}

		cover_style() {
			const url = this.store().photo().url( this.store().post_cover( this.post_link() ) )
			return { backgroundImage: url ? `url("${ url }")` : 'none' }
		}

		tags() {
			return this.store().post_tags( this.post_link() ).map( ( tag: string ) => this.Tag( tag ) )
		}

		card_rows() {
			const rows = [] as any[]
			if( this.store().post_cover( this.post_link() ) ) rows.push( this.Cover() )
			rows.push( this.Info() )
			return rows
		}

		info_rows() {
			const rows = [] as any[]
			if( this.tags().length ) rows.push( this.Tags() )
			rows.push( this.Title(), this.Excerpt(), this.Meta() )
			return rows
		}

		tag_title( tag: string ) {
			return `#${ tag }`
		}

		tag_hint( tag: string ) {
			return this.Tag_hint()
		}

		@ $mol_action
		tag_click( tag: string ) {
			this.tag_select( tag )
		}

	}
}
