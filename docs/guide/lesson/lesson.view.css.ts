namespace $.$$ {

	$mol_style_define( $bog_docs_guide_lesson, {

		Explanation: {
			padding: $mol_gap.block,
			background: {
				color: $mol_theme.card,
			},
			border: {
				radius: $mol_gap.round,
			},
		},

		Code_editor: {
			border: {
				style: 'solid',
				width: '1px',
				color: $mol_theme.line,
				radius: $mol_gap.round,
			},
			padding: $mol_gap.block,
		},

		Task_section: {
			flex: {
				direction: 'column',
			},
			gap: $mol_gap.block,
			padding: $mol_gap.block,
			background: {
				color: $mol_theme.card,
			},
			border: {
				radius: $mol_gap.round,
			},
		},

		Actions: {
			gap: $mol_gap.block,
			flex: {
				wrap: 'wrap',
			},
			align: {
				items: 'center',
			},
			padding: {
				top: '0.75rem',
			},
			border: {
				top: {
					style: 'solid',
					width: '1px',
					color: $mol_theme.line,
				},
			},
		},

		Check_success: {
			color: '#388e3c',
			font: {
				weight: 'bold',
			},
			padding: {
				top: '0.25rem',
				bottom: '0.25rem',
				left: '0.75rem',
				right: '0.75rem',
			},
			background: {
				color: '#388e3c1a',
			},
			border: {
				radius: $mol_gap.round,
			},
		},

		Check_error: {
			color: '#d32f2f',
			font: {
				weight: 'bold',
			},
			padding: {
				top: '0.25rem',
				bottom: '0.25rem',
				left: '0.75rem',
				right: '0.75rem',
			},
			background: {
				color: '#d32f2f1a',
			},
			border: {
				radius: $mol_gap.round,
			},
		},

		Next_button: {
			color: $mol_theme.control,
			font: {
				weight: 'bold',
			},
		},

	} )

}
