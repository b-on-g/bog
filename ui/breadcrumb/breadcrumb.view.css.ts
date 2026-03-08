namespace $ {
	$mol_style_define( $bog_ui_breadcrumb, {
		display: 'flex',
		flex: {
			direction: 'row',
			wrap: 'nowrap',
			shrink: 1,
		},
		align: {
			items: 'center',
		},
		gap: '.5rem',
		font: {
			size: '.875rem',
		},
		overflow: {
			x: 'auto',
		},
		whiteSpace: 'nowrap',
		minWidth: 0,
		Crumb: {
			flex: {
				shrink: 0,
			},
			whiteSpace: 'nowrap',
		},
		Sep: {
			color: $mol_theme.shade,
			flex: {
				shrink: 0,
			},
			whiteSpace: 'nowrap',
		},
		Last: {
			color: $mol_theme.text,
			font: {
				weight: 500,
			},
			flex: {
				shrink: 0,
			},
			whiteSpace: 'nowrap',
		},
	} )
}
