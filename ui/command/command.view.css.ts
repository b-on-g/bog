namespace $ {

	$mol_style_define( $bog_ui_command, {

		position: 'fixed',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		zIndex: 9999,
		pointerEvents: 'none',
		display: 'flex',
		justify: { content: 'center' },
		padding: { top: '15vh' },

		Backdrop: {
			position: 'fixed',
			top: 0,
			left: 0,
			right: 0,
			bottom: 0,
			background: {
				color: '#00000000',
			},
			pointerEvents: 'none',
		},

		Dialog: {
			position: 'relative',
			zIndex: 1,
			width: '32rem',
			maxWidth: '90vw',
			maxHeight: '60vh',
			display: 'flex',
			flex: {
				direction: 'column',
			},
			background: {
				color: $mol_theme.back,
			},
			borderRadius: $mol_gap.round,
			boxShadow: '0 16px 48px #00000066',
			overflow: { y: 'hidden', x: 'hidden' },
			pointerEvents: 'auto',
		},

		Search: {
			padding: { top: '0.75rem', bottom: '0.75rem', left: '1rem', right: '1rem' },
			font: {
				size: '1rem',
			},
			border: {
				style: 'none',
			},
		},

		Results: {
			overflow: { y: 'auto', x: 'hidden' },
			flex: {
				grow: 1,
				shrink: 1,
			},
			padding: { top: '0.25rem', bottom: '0.5rem', left: '0.5rem', right: '0.5rem' },
			border: {
				width: 0,
				style: 'solid',
				color: $mol_theme.line,
			},
		},

		'@': {
			bog_ui_command_showed: {
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

	$mol_style_define( $bog_ui_command_group, {

		Title: {
			padding: { top: '0.75rem', bottom: '0.25rem', left: '0.5rem', right: '0.5rem' },
			font: {
				size: '0.7rem',
				weight: 'bold',
			},
			color: $mol_theme.shade,
			textTransform: 'uppercase',
			userSelect: 'none',
		},

	} )

	$mol_style_define( $bog_ui_command_item, {

		display: 'flex',
		justify: { content: 'space-between' },
		align: { items: 'center' },
		padding: { top: '0.5rem', bottom: '0.5rem', left: '0.75rem', right: '0.75rem' },
		borderRadius: $mol_gap.round,
		cursor: 'pointer',

		Label: {
			flex: {
				grow: 1,
			},
		},

		Shortcut: {
			font: {
				size: '0.75rem',
			},
			color: $mol_theme.shade,
			padding: { top: 0, bottom: 0, left: '1rem', right: 0 },
			whiteSpace: 'nowrap',
		},

		'@': {
			bog_ui_command_item_active: {
				true: {
					background: {
						color: $mol_theme.current,
					},
				},
			},
		},

	} )

}
