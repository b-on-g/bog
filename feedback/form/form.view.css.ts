namespace $ {
	$mol_style_define($bog_feedback_form, {
		color: $mol_theme.text,
		flex: {
			basis: '40rem',
		},

		margin: [0, 'auto'],

		Descr: {
			flex: {
				grow: 0,
			},
		},

		Prompt: {
			padding: $mol_gap.block,
		},

		Entry_my: {
			margin: {
				bottom: $mol_gap.block,
			},
		},

		Entries: {
			// TODO: стили для секции отзывов (только для владельца)
		},
	})
}
