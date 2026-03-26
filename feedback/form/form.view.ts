namespace $.$$ {
	const LAND_ID = 'iexkmPYx_9RQxWRZF'
	const OWNER_LORDS = ['30rPfnwR_eBFtt8H6', 'G4l4UZr3_ibnzXhgQ', 'BJ7CAnEP_XYEV6Z67']
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
			return OWNER_LORDS.includes(this.my_lord())
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

		@$mol_mem
		draft_text(next?: string) {
			if (next !== undefined) return next
			const entry = this.entry_mine()
			return entry?.Text()?.val() ?? ''
		}

		@$mol_mem
		draft_contact(next?: string) {
			if (next !== undefined) return next
			const entry = this.entry_mine()
			return entry?.Contact()?.val() ?? ''
		}

		has_entry() {
			return !!this.entry_mine()
		}

		submit_title() {
			return this.has_entry() ? 'Update feedback' : 'Send feedback'
		}

		@$mol_action
		submit() {
			const text = this.draft_text()
			const contact = this.draft_contact()
			console.log('submit', { text, contact })
			if (!text) return
			const entry = this.entry_mine_or_create()
			if (!entry) return
			entry.Text('auto')!.val(text)
			console.log('written text:', entry.Text()?.val())
			if (contact) entry.Contact('auto')!.val(contact)
			console.log('written contact:', entry.Contact()?.val())
		}

		body() {
			return [
				this.Status(),
				this.Prompt(),
				this.Entry_my(),
				this.Contact_field(),
				this.Submit(),
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
			const text = entry?.Text()?.val() ?? ''
			console.log('entry_row_text', index, { lord, text })
			return text
		}

		entry_row_contact(index: number) {
			const lord = this.all_lords()[index]
			if (!lord) return ''
			const entry = this.entries_dict().key(lord)
			return entry?.Contact()?.val() ?? 'Anonymous'
		}
	}
}
