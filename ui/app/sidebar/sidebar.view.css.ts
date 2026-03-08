namespace $ {

	$mol_style_define( $bog_ui_app_sidebar, {

		padding: $mol_gap.block,

		Description: {
			color: $mol_theme.shade,
			padding: {
				bottom: '1rem',
			},
		},

		Mode_title: {
			font: {
				size: '1.125rem',
				weight: 'bold',
			},
			padding: {
				top: '.5rem',
				bottom: '.75rem',
			},
		},

		Mode_buttons: {
			display: 'flex',
			gap: '.75rem',
			flex: {
				wrap: 'wrap',
			},
			padding: {
				bottom: '.5rem',
			},
		},

		Current_mode: {
			color: $mol_theme.shade,
			font: {
				size: '0.875rem',
			},
			padding: {
				bottom: '1rem',
			},
		},

		Preview: {
			display: 'flex',
			flex: {
				wrap: 'wrap',
			},
			border: {
				width: '1px',
				style: 'solid',
				color: $mol_theme.line,
			},
			borderRadius: '0.5rem',
			overflow: 'hidden',
			minHeight: '200px',
		},

		Preview_content: {
			flex: {
				grow: 1,
			},
			display: 'flex',
			align: {
				items: 'center',
			},
			justify: {
				content: 'center',
			},
			color: $mol_theme.shade,
		},

	} )

}
