namespace $ {

	$mol_style_define( $bog_ui_sidebar, {

		display: 'flex',
		flex: {
			direction: 'column',
			shrink: 0,
		},
		overflow: 'hidden',
		background: {
			color: $mol_theme.back,
		},
		border: {
			radius: 0,
		},
		padding: {
			top: '.5rem',
			bottom: '.5rem',
			left: '.5rem',
			right: '.5rem',
		},

		Header: {
			padding: {
				top: '.5rem',
				bottom: '.5rem',
				left: '.75rem',
				right: '.75rem',
			},
		},

		Items: {
			flex: {
				grow: 1,
			},
			overflow: {
				y: 'auto',
				x: 'hidden',
			},
		},

		Footer: {
			padding: {
				top: '.5rem',
				bottom: '.5rem',
				left: '.75rem',
				right: '.75rem',
			},
		},

		Toggle: {
			flex: {
				shrink: 0,
			},
			align: {
				self: 'flex-start',
			},
			padding: {
				top: '.5rem',
				bottom: '.5rem',
				left: '.75rem',
				right: '.75rem',
			},
		},

	} )

}
