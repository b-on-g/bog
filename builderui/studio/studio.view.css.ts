/** @see $bog_builderui */
namespace $ {
	$mol_style_define( $bog_builderui_studio, {
		minHeight: '100vh',
		background: {
			color: $bog_builderui.back,
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
				color: $bog_builderui.card,
			},
			border: {
				right: {
					width: '1px',
					style: 'solid',
					color: $bog_builderui.line,
				},
			},
			flex: {
				direction: 'column',
			},
		},
		Title: {
			font: {
				family: $bog_builderui.font_head,
				weight: 700,
				size: '1.125rem',
			},
			color: $bog_builderui.text,
			padding: {
				bottom: '0.5rem',
			},
		},
		Preview: {
			flex: {
				grow: 1,
			},
		},
		Stack: {
			flex: {
				direction: 'column',
				grow: 1,
			},
			padding: {
				top: '2rem',
				bottom: '2rem',
				left: '2rem',
				right: '2rem',
			},
			gap: '1rem',
			maxWidth: '720px',
		},
		Btns_row: {
			flex: {
				direction: 'row',
			},
			gap: '0.5rem',
		},
		Buttons_title: {
			font: {
				family: $bog_builderui.font_head,
				weight: 600,
				size: '1rem',
			},
			color: $bog_builderui.shade,
		},
		Card_title: {
			font: {
				family: $bog_builderui.font_head,
				weight: 600,
				size: '1rem',
			},
			color: $bog_builderui.text,
		},
		Card_text: {
			color: $bog_builderui.shade,
		},
		Field_title: {
			font: {
				family: $bog_builderui.font_head,
				weight: 600,
				size: '1rem',
			},
			color: $bog_builderui.text,
		},
	} )
}
