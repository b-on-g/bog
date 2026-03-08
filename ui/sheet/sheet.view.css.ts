namespace $ {

	$mol_style_define( $bog_ui_sheet, {

		position: 'fixed',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		zIndex: 9999,
		pointerEvents: 'none',

		Backdrop: {
			position: 'absolute',
			top: 0,
			left: 0,
			right: 0,
			bottom: 0,
			background: {
				color: '#00000000',
			},
			pointerEvents: 'none',
		},

		Panel: {
			position: 'absolute',
			background: {
				color: $mol_theme.back,
			},
			overflow: {
				y: 'auto',
				x: 'hidden',
			},
			pointerEvents: 'auto',
			boxShadow: '0 0 24px #00000033',
		},

		'@': {
			bog_ui_sheet_showed: {
				true: {
					pointerEvents: 'auto',
					Backdrop: {
						pointerEvents: 'auto',
						background: {
							color: '#00000066',
						},
					},
				},
			},
		},

	} )

}
