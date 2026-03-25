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

		my_lord() {
			return this.$.$giper_baza_auth.current().pass().lord().str
		}

		@ $mol_mem
		entry_list() {
			const links = this.topic().Entries()?.items() ?? []
			return links
				.filter( ( link ): link is $giper_baza_link => link !== null )
				.map( link => this.topic().land().Pawn( $bog_feedback_entry ).Head( link ) )
		}

		/** Мой entry — находит или создаёт один раз */
		@ $mol_mem
		entry_mine() {
			const my_lord = this.my_lord()
			const existing = this.entry_list().find(
				entry => entry.Author()?.val() === my_lord
			)
			if( existing ) return existing

			const land = this.topic().land()
			const self = land.self_make()
			const entry = land.Pawn( $bog_feedback_entry ).Head( self )

			entry.Author( 'auto' )!.val( my_lord )
			this.topic().Entries( 'auto' )!.add( self )

			return entry
		}

		entry_text( next?: string ) {
			const entry = this.entry_mine()
			if( next !== undefined ) {
				entry.Text( 'auto' )!.text( next )
			}
			return entry.Text()?.text() ?? ''
		}

		contact( next?: string ) {
			const entry = this.entry_mine()
			if( next !== undefined ) {
				entry.Contact( 'auto' )!.val( next )
			}
			return entry.Contact()?.val() ?? ''
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
