namespace $ {

	$mol_style_define( $bog_ui_table , {

		overflow: { x: 'auto' },
		width: '100%',

		Head: {
			background: {
				color: $mol_theme.back ,
			},
			position: 'sticky',
			top: 0,
			zIndex: 1,
		},

		Head_button: {
			justify: {
				content: 'flex-start',
			},
			flex: {
				grow: 1,
			},
			font: {
				weight: 'bold',
			},
			whiteSpace: 'nowrap',
		},

		Col_head: {
			border: {
				style: 'solid',
				width: 0,
				color: $mol_theme.line,
			},
			minWidth: '100px',
		},

		Row: {
			border: {
				style: 'solid',
				width: 0,
				color: $mol_theme.line,
			},
		},

		Cell_text: {
			padding: {
				top: '0.5rem',
				bottom: '0.5rem',
				left: '0.75rem',
				right: '0.75rem',
			},
			minWidth: '100px',
		},

		Cell_number: {
			padding: {
				top: '0.5rem',
				bottom: '0.5rem',
				left: '0.75rem',
				right: '0.75rem',
			},
			textAlign: 'right',
			minWidth: '80px',
		},

		Select_all: {
			flex: {
				shrink: 0,
				grow: 0,
			},
			width: '3rem',
		},

		Select_row: {
			flex: {
				shrink: 0,
				grow: 0,
			},
			width: '3rem',
		},

	} )

}
