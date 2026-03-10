namespace $.$$ {

	$mol_style_define( $bog_project_tree_appname_requisites, {

		flex: {
			grow: 1,
		},

		Head: {
			background: {
				color: 'transparent',
			},
		},

		Title: {
			font: {
				size: '1.25rem',
				weight: 'bold',
			},
			color: $mol_theme.text,
			letterSpacing: '0.02em',
		},

		Content: {
			padding: '1rem',
			gap: '1rem',
		},

		Header: {
			fontSize: '1.25rem',
			fontWeight: 'bold',
			textAlign: 'center',
			padding: '1rem',
			background: {
				color: $mol_theme.card,
			},
			borderRadius: '0.5rem',
		},

		Info_card: {
			background: {
				color: $mol_theme.card,
			},
			borderRadius: '0.5rem',
			padding: '1.5rem',
			display: 'flex',
			flexDirection: 'column',
			gap: '1rem',
		},

		Contact_card: {
			background: {
				color: $mol_theme.card,
			},
			borderRadius: '0.5rem',
			padding: '1.5rem',
			display: 'flex',
			flexDirection: 'column',
			gap: '1rem',
		},

		Contact_header: {
			fontSize: '1.1rem',
			fontWeight: 'bold',
			color: $mol_theme.special,
			marginBottom: '0.5rem',
		},

		OGRNIP: {
			padding: { top: '0.5rem', bottom: '0.5rem', left: 0, right: 0 },
			borderBottom: `1px solid ${$mol_theme.line}`,
		},

		OGRNIP_value: {
			fontFamily: 'monospace',
			fontSize: '1.1rem',
		},

		INN: {
			padding: { top: '0.5rem', bottom: '0.5rem', left: 0, right: 0 },
		},

		INN_value: {
			fontFamily: 'monospace',
			fontSize: '1.1rem',
		},

		Email: {
			padding: { top: '0.5rem', bottom: '0.5rem', left: 0, right: 0 },
			borderBottom: `1px solid ${$mol_theme.line}`,
		},

		Email_link: {
			color: $mol_theme.special,
		},

		Telegram: {
			padding: { top: '0.5rem', bottom: '0.5rem', left: 0, right: 0 },
			borderBottom: `1px solid ${$mol_theme.line}`,
		},

		Telegram_link: {
			color: $mol_theme.special,
		},


		Footer: {
			display: 'flex',
			justifyContent: 'center',
			padding: '1.5rem',
			marginTop: '1rem',
			borderTop: `1px solid ${$mol_theme.line}`,
		},

		Offer_link: {
			color: $mol_theme.special,
			textDecoration: 'underline',
		},

	} )

}
