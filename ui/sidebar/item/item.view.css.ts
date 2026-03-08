namespace $ {
	$mol_style_define( $bog_ui_sidebar_item, {
		display: 'flex',
		flex: {
			shrink: 1,
		},
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
		overflow: 'hidden',
		Icon: {
			flex: {
				shrink: 0,
			},
		},
		Label: {
			whiteSpace: 'nowrap',
			overflow: 'hidden',
			textOverflow: 'ellipsis',
			flex: {
				shrink: 1,
			},
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
