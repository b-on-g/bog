namespace $.$$ {

	$mol_style_define( $bog_jj_settings, {
		width: '100%',
		maxWidth: '44rem',
		margin: {
			left: 'auto',
			right: 'auto',
		},

		Title: {
			flex: {
				grow: 0,
			},
		},

		Profile_section: {
			Content: {
				gap: $mol_gap.block,
			},
		},

		Access_section: {
			Content: {
				gap: $mol_gap.block,
			},
		},

		Images: {
			gap: $mol_gap.block,
			alignItems: 'flex-start',
		},

		Image_field: {
			flexDirection: 'column',
			gap: $mol_gap.text,
		},

		Image_preview: {
			background: {
				size: [ 'cover' ],
				position: 'center',
				color: $mol_theme.field,
			},
			border: {
				radius: $mol_gap.round,
			},
		},

		Image_actions: {
			gap: $mol_gap.text,
			alignItems: 'center',
		},

		Public: {
			flexDirection: 'column',
			gap: $mol_gap.text,
		},

		Account_id: {
			alignSelf: 'flex-start',
		},

		Public_link: {
			alignSelf: 'flex-start',
		},

	} )

}
