namespace $ {
	$mol_style_define( $bog_ui_badge, {
		display: 'inline-flex',
		align: {
			items: 'center',
		},
		padding: {
			top: '.125rem',
			bottom: '.125rem',
			left: '.5rem',
			right: '.5rem',
		},
		border: {
			radius: {
				leftTop: '9999px',
				rightTop: '9999px',
				leftBottom: '9999px',
				rightBottom: '9999px',
			},
			color: $mol_theme.line,
			style: 'solid',
			width: '1px',
		},
		font: {
			size: '.75rem',
			weight: 500,
		},
		line: {
			height: '1rem',
		},
		white: {
			space: 'nowrap',
		},
		background: {
			color: $mol_theme.card,
		},
		color: $mol_theme.text,
		'@': {
			bog_ui_badge_type: {
				success: {
					background: {
						color: '#22c55e1a',
					},
					color: '#16a34a',
					border: {
						color: '#22c55e33',
						style: 'solid',
						width: '1px',
						radius: {
							leftTop: '9999px',
							rightTop: '9999px',
							leftBottom: '9999px',
							rightBottom: '9999px',
						},
					},
				},
				warning: {
					background: {
						color: '#eab3081a',
					},
					color: '#ca8a04',
					border: {
						color: '#eab30833',
						style: 'solid',
						width: '1px',
						radius: {
							leftTop: '9999px',
							rightTop: '9999px',
							leftBottom: '9999px',
							rightBottom: '9999px',
						},
					},
				},
				error: {
					background: {
						color: '#ef44441a',
					},
					color: '#dc2626',
					border: {
						color: '#ef444433',
						style: 'solid',
						width: '1px',
						radius: {
							leftTop: '9999px',
							rightTop: '9999px',
							leftBottom: '9999px',
							rightBottom: '9999px',
						},
					},
				},
				info: {
					background: {
						color: '#3b82f61a',
					},
					color: '#2563eb',
					border: {
						color: '#3b82f633',
						style: 'solid',
						width: '1px',
						radius: {
							leftTop: '9999px',
							rightTop: '9999px',
							leftBottom: '9999px',
							rightBottom: '9999px',
						},
					},
				},
			},
		},
	} )
}
