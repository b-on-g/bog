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

		/** Находит существующий entry текущего пользователя */
		@ $mol_mem
		entry_existing() {
			const my_lord = this.$.$giper_baza_auth.current().pass().lord().str
			return this.entry_list().find(
				entry => entry.land().link().lord().str === my_lord
			) ?? null
		}

		/** Создаёт новый entry-land */
		@ $mol_action
		entry_create() {
			const preset: $giper_baza_rank_preset = [
				[ null, $giper_baza_rank_post( 'late' ) ],
			]

			const land = this.glob().land_grab( preset )
			const entry = land.Data( $bog_feedback_entry ) as $bog_feedback_entry

			this.topic().Entries( 'auto' )!.add( land.link() )

			return entry
		}

		/** Список всех entry */
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
			if( next !== undefined ) {
				const entry = this.entry_existing() ?? this.entry_create()
				entry.Text( 'auto' )!.text( next )
				return next
			}
			const entry = this.entry_existing()
			return entry?.Text()?.text() ?? ''
		}

		contact( next?: string ) {
			if( next !== undefined ) {
				const entry = this.entry_existing() ?? this.entry_create()
				entry.Contact( 'auto' )!.val( next )
				return next
			}
			const entry = this.entry_existing()
			return entry?.Contact()?.val() ?? ''
		}

		@ $mol_mem
		body() {
			return [
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
