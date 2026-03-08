namespace $ {

	$mol_style_define( $bog_ui_app_overview, {

		padding: $mol_gap.block,

		Description: {
			color: $mol_theme.shade,
			padding: {
				bottom: '1rem',
			},
		},

		Grid: {
			display: 'grid',
			gridTemplateColumns: 'repeat(auto-fill, minmax(clamp(200px, 30%, 320px), 1fr))',
			gap: '1rem',
			padding: {
				top: '0.5rem',
			},
		},

	} )

	$mol_style_define( $bog_ui_app_overview_card, {

		display: 'flex',
		flex: {
			direction: 'column',
		},
		background: {
			color: $mol_theme.card,
		},
		borderRadius: '0.5rem',
		overflow: {
			x: 'hidden',
			y: 'hidden',
		},
		cursor: 'pointer',
		textAlign: 'left',

		Preview: {
			display: 'flex',
			flex: {
				wrap: 'wrap',
			},
			gap: '0.5rem',
			align: {
				items: 'center',
			},
			justify: {
				content: 'center',
			},
			padding: {
				top: '1.25rem',
				bottom: '1.25rem',
				left: '1rem',
				right: '1rem',
			},
			background: {
				color: $mol_theme.back,
			},
			minHeight: '80px',
		},

		Title: {
			font: {
				size: '1rem',
				weight: 'bold',
			},
			padding: {
				top: '0.75rem',
				left: '1rem',
				right: '1rem',
			},
		},

		Card_desc: {
			font: {
				size: '0.8125rem',
			},
			color: $mol_theme.shade,
			padding: {
				top: '0.25rem',
				bottom: '0.75rem',
				left: '1rem',
				right: '1rem',
			},
		},

	} )

}
