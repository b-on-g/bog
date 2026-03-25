namespace $.$$ {

	const OWNER_LORD = 'Q4zRr2UW_0m2uzoRR'

	export class $bog_feedback_form extends $.$bog_feedback_form {

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

		/** Мой lord id */
		my_lord() {
			return this.$.$giper_baza_auth.current().pass().lord().str
		}

		/** Все entries в этом land */
		@ $mol_mem
		entry_list() {
			const links = this.topic().Entries()?.items() ?? []
			return links
				.filter( ( link ): link is $giper_baza_link => link !== null )
				.map( link => {
					return this.topic().land().Pawn( $bog_feedback_entry ).Head( link )
				} )
		}

		/** Мой entry — ищем по lord или создаём */
		_my_entry: $bog_feedback_entry | null = null

		entry_mine() {
			if( this._my_entry ) return this._my_entry

			const my_lord = this.my_lord()
			const existing = this.entry_list().find( entry => {
				return entry.Contact()?.val() === my_lord
					|| entry.land().link().lord().str === my_lord
			} )

			if( existing ) {
				this._my_entry = existing
				return existing
			}

			return null
		}

		@ $mol_action
		entry_create() {
			const land = this.topic().land()
			const self = land.self_make()
			const entry = land.Pawn( $bog_feedback_entry ).Head( self )

			this.topic().Entries( 'auto' )!.add( self )
			this._my_entry = entry

			return entry
		}

		entry_text( next?: string ) {
			if( next !== undefined ) {
				const entry = this.entry_mine() ?? this.entry_create()
				entry.Text( 'auto' )!.text( next )
				return next
			}
			return this.entry_mine()?.Text()?.text() ?? ''
		}

		contact( next?: string ) {
			if( next !== undefined ) {
				const entry = this.entry_mine() ?? this.entry_create()
				entry.Contact( 'auto' )!.val( next )
				return next
			}
			return this.entry_mine()?.Contact()?.val() ?? ''
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
			return this.entry_list()[ index ]?.Text()?.text() ?? ''
		}

		entry_row_contact( index: number ) {
			return this.entry_list()[ index ]?.Contact()?.val() ?? 'Anonymous'
		}

	}

}
