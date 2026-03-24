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

		/** Кеш созданного entry чтобы не создавать повторно */
		_entry_created: $bog_feedback_entry | null = null

		/** Получить entry текущего пользователя (найти или создать при записи) */
		entry_ensure() {
			if( this._entry_created ) return this._entry_created

			const my_lord = this.$.$giper_baza_auth.current().pass().lord().str
			const existing = this.entry_list().find(
				entry => entry.land().link().lord().str === my_lord
			)
			if( existing ) {
				this._entry_created = existing
				return existing
			}

			const preset: $giper_baza_rank_preset = [
				[ null, $giper_baza_rank_post( 'late' ) ],
			]
			const land = this.glob().land_grab( preset )
			const entry = land.Data( $bog_feedback_entry ) as $bog_feedback_entry

			this.topic().Entries( 'auto' )!.add( land.link() )
			this._entry_created = entry

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
				const entry = this.entry_ensure()
				entry.Text( 'auto' )!.text( next )
				return next
			}
			if( !this._entry_created ) {
				const my_lord = this.$.$giper_baza_auth.current().pass().lord().str
				const existing = this.entry_list().find(
					entry => entry.land().link().lord().str === my_lord
				)
				if( !existing ) return ''
				this._entry_created = existing
			}
			return this._entry_created?.Text()?.text() ?? ''
		}

		contact( next?: string ) {
			if( next !== undefined ) {
				const entry = this.entry_ensure()
				entry.Contact( 'auto' )!.val( next )
				return next
			}
			if( !this._entry_created ) {
				const my_lord = this.$.$giper_baza_auth.current().pass().lord().str
				const existing = this.entry_list().find(
					entry => entry.land().link().lord().str === my_lord
				)
				if( !existing ) return ''
				this._entry_created = existing
			}
			return this._entry_created?.Contact()?.val() ?? ''
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
