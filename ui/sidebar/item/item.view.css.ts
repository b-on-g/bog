namespace $ {
	$mol_style_define( $bog_ui_sidebar_item, {
		display: 'flex',
		align: {
			items: 'center',
		},
		gap: '.75rem',
		padding: {
			top: '.5rem',
			bottom: '.5rem',
			left: '.75rem',
			right: '.75rem',
		},
		border: {
			radius: $mol_gap.round,
		},
		color: $mol_theme.text,
		Icon: {
			flex: {
				shrink: 0,
			},
		},
		Label: {
			white: {
				space: 'nowrap',
			},
			overflow: 'hidden',
		},
		'@': {
			bog_ui_sidebar_item_active: {
				'true': {
					background: {
						color: $mol_theme.current,
					},
				},
			},
		},
	} )
}
