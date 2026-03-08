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
		width: '100%',
		height: '100%',
		gap: '1rem',
		padding: {
			top: '2rem',
			bottom: '2rem',
			left: '2rem',
			right: '2rem',
		},
		boxSizing: 'border-box',
		Icon: {
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
			textAlign: 'center',
		},
	} )
}
