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
		borderRadius: '9999px',
		border: {
			color: $mol_theme.line,
			style: 'solid',
			width: '1px',
		},
		font: {
			size: '.75rem',
			weight: 500,
		},
		lineHeight: '1rem',
		whiteSpace: 'nowrap',
		maxWidth: '100%',
		overflow: 'hidden',
		background: {
			color: $mol_theme.card,
		},
		color: $mol_theme.text,
		Label: {
			overflow: 'hidden',
			textOverflow: 'ellipsis',
		},
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
					},
				},
			},
		},
	} )
}
