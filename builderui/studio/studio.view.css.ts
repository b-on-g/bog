namespace $ {
	$mol_style_define( $bog_builderui_studio, {
		minHeight: '100vh',
		background: {
			color: 'var(--bog_builderui_back)',
		},
		flex: {
			direction: 'row',
		},
		Panel: {
			minWidth: '280px',
			maxWidth: '320px',
			padding: {
				top: '1.5rem',
				bottom: '1.5rem',
				left: '1.5rem',
				right: '1.5rem',
			},
			gap: '1rem',
			background: {
				color: 'var(--bog_builderui_card)',
			},
			border: {
				right: {
					width: '1px',
					style: 'solid',
					color: 'var(--bog_builderui_line)',
				},
			},
			flex: {
				direction: 'column',
			},
		},
		Title: {
			font: {
				family: 'var(--bog_builderui_font_head)',
				weight: 700,
				size: '1.125rem',
			},
			color: 'var(--bog_builderui_text)',
			padding: {
				bottom: '0.5rem',
			},
		},
		Preview: {
			flex: {
				grow: 1,
				direction: 'column',
			},
			padding: {
				top: '2rem',
				bottom: '2rem',
				left: '2rem',
				right: '2rem',
			},
			gap: '1rem',
		},
		Btns_row: {
			flex: {
				direction: 'row',
			},
			gap: '0.5rem',
		},
		Buttons_title: {
			font: {
				family: 'var(--bog_builderui_font_head)',
				weight: 600,
				size: '1rem',
			},
			color: 'var(--bog_builderui_shade)',
		},
		Card_title: {
			font: {
				family: 'var(--bog_builderui_font_head)',
				weight: 600,
				size: '1rem',
			},
			color: 'var(--bog_builderui_text)',
		},
		Card_text: {
			color: 'var(--bog_builderui_shade)',
		},
		Field_title: {
			font: {
				family: 'var(--bog_builderui_font_head)',
				weight: 600,
				size: '1rem',
			},
			color: 'var(--bog_builderui_text)',
		},
	} )
}
