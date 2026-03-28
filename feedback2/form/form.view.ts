namespace $.$$ {
	const Entries_dict = $giper_baza_dict_to($bog_feedback2_entry)
	const Registry_dict = $giper_baza_dict_to($giper_baza_atom_text)

	export class $bog_feedback2_form extends $.$bog_feedback2_form {
		registry_land() {
			return this.$.$giper_baza_glob.Land(new $giper_baza_link(this.registry_link()))
		}

		registry_dict() {
			return this.registry_land().Data(Registry_dict)
		}

		my_pass() {
			return this.$.$giper_baza_auth.current().pass()
		}

		my_lord() {
			return this.my_pass().lord().str
		}

		/** Ссылка на feedback land: из URL (приоритет) или из реестра */
		feedback_land_link(): string | null {
			const from_arg = this.$.$mol_state_arg.value('land')
			if (from_arg) return from_arg
			return this.registry_dict().key(this.feedback_id())?.val() ?? null
		}

		land() {
			const link = this.feedback_land_link()
			if (link) return this.$.$giper_baza_glob.Land(new $giper_baza_link(link))
			return this.land_ensure()
		}

		@$mol_action
		land_ensure() {
			const land = this.$.$giper_baza_glob.land_grab([[null, $giper_baza_rank_post('just')]])
			const link = land.link().str
			this.registry_dict().key(this.feedback_id(), 'auto')!.val(link)
			return land
		}

		entries_dict() {
			return this.land().Data(Entries_dict)
		}

		is_owner() {
			const rank = this.registry_land().pass_rank(this.my_pass())
			return $giper_baza_rank_tier_of(rank) >= $giper_baza_rank_tier.rule
		}

		is_configured() {
			return !!this.registry_link()
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
			if (!text) return
			const entry = this.entry_mine_or_create()
			if (!entry) return
			entry.Text('auto')!.val(text)
			if (contact) entry.Contact('auto')!.val(contact)
		}

		body() {
			if (!this.is_configured()) return [this.Not_configured()]
			return [
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
			return entry?.Text()?.val() ?? ''
		}

		entry_row_contact(index: number) {
			const lord = this.all_lords()[index]
			if (!lord) return ''
			const entry = this.entries_dict().key(lord)
			return entry?.Contact()?.val() ?? 'Anonymous'
		}
	}
}
