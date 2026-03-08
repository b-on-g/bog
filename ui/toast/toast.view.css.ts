namespace $ {
	$mol_style_define( $bog_ui_toast, {
		display: 'flex',
		align: {
			items: 'center',
		},
		gap: '.75rem',
		padding: {
			top: '.75rem',
			bottom: '.75rem',
			left: '1rem',
			right: '1rem',
		},
		borderRadius: '0.5rem',
		background: {
			color: $mol_theme.card,
		},
		color: $mol_theme.text,
		border: {
			style: 'solid',
			width: '1px',
			color: $mol_theme.line,
		},
		box: {
			shadow: [{
				x: 0,
				y: '4px',
				blur: '12px',
				spread: 0,
				color: '#0000001a',
			}],
		},
		Icon: {
			font: {
				size: '1.25rem',
			},
			flex: {
				shrink: 0,
			},
		},
		Body: {
			flex: {
				grow: 1,
			},
			font: {
				size: '.875rem',
			},
		},
		Close: {
			flex: {
				shrink: 0,
			},
		},
		'@': {
			bog_ui_toast_type: {
				info: {
					background: { color: '#3b82f61a' },
					color: '#2563eb',
					border: { color: '#3b82f633', style: 'solid', width: '1px' },
				},
				success: {
					background: { color: '#22c55e1a' },
					color: '#16a34a',
					border: { color: '#22c55e33', style: 'solid', width: '1px' },
				},
				warning: {
					background: { color: '#eab3081a' },
					color: '#ca8a04',
					border: { color: '#eab30833', style: 'solid', width: '1px' },
				},
				error: {
					background: { color: '#ef44441a' },
					color: '#dc2626',
					border: { color: '#ef444433', style: 'solid', width: '1px' },
				},
			},
		},
	} )
}
