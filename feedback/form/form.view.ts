namespace $.$$ {
	const LAND_ID = 'TiKq9q8X_9p8WA2PU'
	const OWNER_LORD = 'Q4zRr2UW_0m2uzoRR'
	const Entries_dict = $giper_baza_dict_to($bog_feedback_entry)

	export class $bog_feedback_form extends $.$bog_feedback_form {
		land() {
			return this.$.$giper_baza_glob.Land(new $giper_baza_link(LAND_ID))
		}

		entries_dict() {
			return this.land().Data(Entries_dict)
		}

		my_lord() {
			return this.$.$giper_baza_auth.current().pass().lord().str
		}

		is_owner() {
			return this.my_lord() === OWNER_LORD
		}

		entry_mine() {
			return this.entries_dict().key(this.my_lord()) ?? null
		}

		@$mol_action
		entry_mine_or_create() {
			return this.entries_dict().key(this.my_lord(), 'auto')
		}

		prompt() {
			return [
				'**Tell us what you think:**',
				'- What did you **like**?',
				'- What could be done **better**?',
				'- Any **suggestions** for the future?',
			].join('\n')
		}

		@ $mol_mem
		entry_text(next?: string) {
			if (next !== undefined) {
				const entry = this.entry_mine_or_create()
				if (entry) entry.Text('auto')!.text(next)
				return next
			}
			const entry = this.entry_mine()
			if (!entry) return ''
			return entry.Text()?.text() ?? ''
		}

		@ $mol_mem
		contact(next?: string) {
			if (next !== undefined) {
				const entry = this.entry_mine_or_create()
				if (entry) entry.Contact('auto')!.val(next)
				return next
			}
			const entry = this.entry_mine()
			if (!entry) return ''
			return entry.Contact()?.val() ?? ''
		}

		body() {
			return [
				this.Status(),
				this.Prompt(),
				this.Entry_my(),
				this.Contact(),
				this.Hint_auto(),
				...(this.is_owner() ? [this.Entries()] : []),
			]
		}

		all_lords() {
			return this.entries_dict().keys() ?? []
		}

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
