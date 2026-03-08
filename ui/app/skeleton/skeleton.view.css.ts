namespace $ {

	$mol_style_define( $bog_ui_app_skeleton, {

		padding: $mol_gap.block,

		Description: {
			color: $mol_theme.shade,
			padding: {
				bottom: '1rem',
			},
		},

		Section_single: {
			font: {
				size: '1.125rem',
				weight: 'bold',
			},
			padding: {
				top: '.5rem',
				bottom: '.75rem',
			},
		},

		Section_card: {
			font: {
				size: '1.125rem',
				weight: 'bold',
			},
			padding: {
				top: '1.5rem',
				bottom: '.75rem',
			},
		},

		Card: {
			display: 'flex',
			flex: {
				direction: 'column',
			},
			gap: '.75rem',
			padding: {
				top: '1rem',
				bottom: '1rem',
				left: '1rem',
				right: '1rem',
			},
			background: {
				color: $mol_theme.card,
			},
			borderRadius: '0.5rem',
		},

		Card_avatar: {
			width: '3rem',
			height: '3rem',
			borderRadius: '50%',
		},

		Card_title: {
			width: '60%',
			height: '1.25rem',
		},

		Card_line1: {
			width: '100%',
		},

		Card_line2: {
			width: '90%',
		},

		Card_short: {
			width: '40%',
		},

		Section_sizes: {
			font: {
				size: '1.125rem',
				weight: 'bold',
			},
			padding: {
				top: '1.5rem',
				bottom: '.75rem',
			},
		},

		Sizes: {
			display: 'flex',
			flex: {
				direction: 'column',
			},
			gap: '.75rem',
		},

		Size_small: {
			height: '.5rem',
		},

		Size_medium: {
			height: '1rem',
		},

		Size_large: {
			height: '2rem',
		},

	} )

}
