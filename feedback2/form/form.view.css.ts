namespace $ {
	$mol_style_define($bog_feedback2_form, {
		color: $mol_theme.text,
		flex: {
			basis: '40rem',
		},

		margin: [0, 'auto'],

		Waiting: {
			padding: $mol_gap.block,
			textAlign: 'center',
			opacity: 0.5,
			animation: {
				name: 'bog_feedback2_form_pulse',
				duration: '1.5s',
				iterationCount: 'infinite',
				timingFunction: 'ease-in-out',
			},
		},

		Prompt: {
			padding: $mol_gap.block,
		},

		Contact_field: {
			margin: {
				top: $mol_gap.space,
			},
		},

		Submit: {
			margin: {
				top: $mol_gap.block,
			},
		},

		Entries: {
			margin: {
				top: $mol_gap.block,
			},
			Content: {
				gap: $mol_gap.block,
			},
		},

		Entry_row: {
			background: {
				color: $mol_theme.card,
			},
			border: {
				radius: $mol_gap.round,
			},
			padding: $mol_gap.block,
			boxShadow: `0 0 0 1px ${$mol_theme.line}`,
			Head: {
				font: {
					size: '1rem',
				},
			},
		},
	})
}
