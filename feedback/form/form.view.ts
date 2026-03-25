namespace $.$$ {
	const LAND_ID = 'nuAHt21o_6EkWk37t'
	const OWNER_LORD = 'Q4zRr2UW_0m2uzoRR'
	const Entries_dict = $giper_baza_dict_to($bog_feedback_entry)

	export class $bog_feedback_form extends $.$bog_feedback_form {

		@$mol_mem
		land() {
			return this.$.$giper_baza_glob.Land(new $giper_baza_link(LAND_ID))
		}

		@$mol_mem
		entries_dict() {
			return this.land().Data(Entries_dict)
		}

		@$mol_mem
		my_lord() {
			return this.$.$giper_baza_auth.current().pass().lord().str
		}

		@$mol_mem
		is_owner() {
			return this.my_lord() === OWNER_LORD
		}

		@$mol_mem
		entry_mine() {
			return this.entries_dict().key(this.my_lord(), 'auto')
		}

		@$mol_mem
		prompt() {
			return [
				'**Tell us what you think:**',
				'- What did you **like**?',
				'- What could be done **better**?',
				'- Any **suggestions** for the future?',
			].join('\n')
		}

		@$mol_mem
		entry_text(next?: string) {
			const entry = this.entry_mine()
			if (!entry) return ''
			if (next !== undefined) {
				entry.Text('auto')!.text(next)
			}
			return entry.Text()?.text() ?? ''
		}

		@$mol_mem
		contact(next?: string) {
			const entry = this.entry_mine()
			if (!entry) return ''
			if (next !== undefined) {
				entry.Contact('auto')!.val(next)
			}
			return entry.Contact()?.val() ?? ''
		}

		@$mol_mem
		body() {
			return [
				this.Prompt(),
				this.Entry_my(),
				this.Contact(),
				this.Hint_auto(),
				...(this.is_owner() ? [this.Entries()] : []),
			]
		}

		@$mol_mem
		all_lords() {
			return this.entries_dict().keys() ?? []
		}

		@$mol_mem
		entry_rows() {
			return this.all_lords().map((_: any, i: number) => this.Entry_row(i))
		}

		entry_row_text(index: number) {
			const lord = this.all_lords()[index]
			if (!lord) return ''
			const entry = this.entries_dict().key(lord)
			return entry?.Text()?.text() ?? ''
		}

		entry_row_contact(index: number) {
			const lord = this.all_lords()[index]
			if (!lord) return ''
			const entry = this.entries_dict().key(lord)
			return entry?.Contact()?.val() ?? 'Anonymous'
		}
	}
}
