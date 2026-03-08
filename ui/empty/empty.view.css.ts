namespace $ {
	$mol_style_define( $bog_ui_empty, {
		display: 'flex',
		flex: {
			direction: 'column',
		},
		align: {
			items: 'center',
		},
		justify: {
			content: 'center',
		},
		gap: '1rem',
		padding: {
			top: '2rem',
			bottom: '2rem',
			left: '2rem',
			right: '2rem',
		},
		Icon: {
			font: {
				size: '3rem',
			},
			color: $mol_theme.shade,
		},
		Title: {
			font: {
				weight: 'bold',
				size: '1.125rem',
			},
			color: $mol_theme.text,
		},
		Message: {
			color: $mol_theme.shade,
			font: {
				size: '.875rem',
			},
			text: {
				align: 'center',
			},
		},
	} )
}
