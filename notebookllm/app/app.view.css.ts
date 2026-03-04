namespace $.$$ {

	$mol_style_define( $bog_notebookllm_app, {

		Notebooks_page: {
			flex: {
				basis: '20rem',
				shrink: 0,
			},
		},

		Notebook_row: {
			cursor: 'pointer',
			gap: $mol_gap.space,
			align: {
				items: 'center',
			},
		},

		Dialog: {
			margin: [ 0, 'auto' ],
			flex: {
				basis: '60rem',
			},
			Body: {
				display: 'flex',
				flex: {
					direction: 'column-reverse',
				},
				align: {
					items: 'stretch',
				},
				padding: $mol_gap.block,
			},
		},

		Model_status: {
			padding: $mol_gap.space,
			font: {
				size: '.85rem',
			},
			opacity: 0.6,
			justify: {
				content: 'center',
			},
		},

		Docs_bar: {
			gap: $mol_gap.space,
			align: {
				items: 'center',
			},
		},

		Prompt_text: {
			flex: {
				shrink: 1,
			},
		},

		Sources_page: {
			flex: {
				basis: '25rem',
			},
			Body_content: {
				gap: $mol_gap.block,
			},
		},

		Doc_row: {
			gap: $mol_gap.space,
			align: {
				items: 'center',
			},
		},

	} )

}
