namespace $ {

	/** Топик для сбора обратной связи. Живёт в своём Land. */
	export class $bog_feedback extends $giper_baza_entity.with({
		Descr: $giper_baza_text,
		Trusted: $giper_baza_list_str,
		Entries: $giper_baza_list_link,
	}) {}

	/** Отдельный отзыв. Живёт в своём Land. */
	export class $bog_feedback_entry extends $giper_baza_dict.with({
		Text: $giper_baza_text,
		Contact: $giper_baza_atom_text,
	}) {}

}
