namespace $.$$ {

	const OWNER_LORD = 'Q4zRr2UW_0m2uzoRR'

	export class $bog_feedback_form extends $.$bog_feedback_form {

		glob() {
			return this.$.$giper_baza_glob
		}

		title( next?: string ) {
			if( next !== undefined ) this.topic().Title( 'auto' )!.val( next )
			return this.topic().Title()?.val() ?? ''
		}

		descr( next?: string ) {
			const content = next !== undefined
				? this.topic().Descr( 'auto' )!
				: this.topic().Descr()
			if( !content ) return ''
			if( next !== undefined ) content.text( next )
			return content.text()
		}

		@ $mol_mem
		is_owner() {
			const my_lord = this.$.$giper_baza_auth.current().pass().lord().str
			return my_lord === OWNER_LORD
		}

		@ $mol_mem
		prompt() {
			return [
				'**Tell us what you think:**',
				'- What did you **like**?',
				'- What could be done **better**?',
				'- Any **suggestions** for the future?',
			].join( '\n' )
		}

		/** Находит или создаёт entry-land для текущего пользователя */
		@ $mol_mem
		entry_my() {

			const my_pass = this.$.$giper_baza_auth.current().pass()
			const my_lord = my_pass.lord().str

			// Ищем уже существующий entry по lord
			const existing = this.entry_list().find(
				entry => entry.land().link().lord().str === my_lord
			)
			if( existing ) return existing

			// Права: автор=rule, все остальные могут постить (с PoW)
			const preset: $giper_baza_rank_preset = [
				[ null, $giper_baza_rank_post( 'late' ) ],
			]

			const land = this.glob().land_grab( preset )
			const entry = land.Data( $bog_feedback_entry ) as $bog_feedback_entry

			this.topic().Entries( 'auto' )!.add( land.link() )

			return entry
		}

		/** Список всех entry (видны только владельцу и доверенным) */
		@ $mol_mem
		entry_list() {
			const links = this.topic().Entries()?.items() ?? []
			return links
				.filter( ( link ): link is $giper_baza_link => link !== null )
				.map( link => {
					const land = this.glob().Land( link )
					return land.Data( $bog_feedback_entry ) as $bog_feedback_entry
				} )
		}

		entry_text( next?: string ) {
			const entry = this.entry_my()
			if( !entry ) return ''
			const text = next !== undefined
				? entry.Text( 'auto' )!
				: entry.Text()
			if( !text ) return ''
			if( next !== undefined ) text.text( next )
			return text.text()
		}

		contact( next?: string ) {
			const entry = this.entry_my()
			if( !entry ) return ''
			if( next !== undefined ) entry.Contact( 'auto' )!.val( next )
			return entry.Contact()?.val() ?? ''
		}

		@ $mol_mem
		body() {
			return [
				...( this.is_owner() || this.descr() ) ? [ this.Descr() ] : [],
				this.Prompt(),
				this.Entry_my(),
				this.Contact(),
				this.Hints(),
				...this.is_owner() ? [ this.Entries() ] : [],
			]
		}

		@ $mol_mem
		entry_rows() {
			return this.entry_list().map( ( _: any, i: number ) => this.Entry_row( i ) )
		}

		entry_row_text( index: number ) {
			const entries = this.entry_list()
			return entries[ index ]?.Text()?.text() ?? ''
		}

		entry_row_contact( index: number ) {
			const entries = this.entry_list()
			return entries[ index ]?.Contact()?.val() ?? 'Anonymous'
		}

	}

}
