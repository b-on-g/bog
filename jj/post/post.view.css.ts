namespace $.$$ {

	$mol_style_define( $bog_jj_post, {
		width: '100%',
		maxWidth: '48rem',
		margin: {
			left: 'auto',
			right: 'auto',
		},

		Tools_content: {
			gap: $mol_gap.text,
		},

		Article: {
			gap: $mol_gap.block,
		},

		Cover: {
			flexDirection: 'column',
		},

		Cover_image: {
			width: '100%',
			minHeight: '14rem',
			background: {
				size: [ 'cover' ],
				position: 'center',
			},
			border: {
				radius: $mol_gap.round,
			},
		},

		Cover_pick: {
			position: 'absolute',
			right: $mol_gap.text,
			top: $mol_gap.text,
		},

		Post_head: {
			gap: $mol_gap.text,
			alignItems: 'center',
		},

		Author: {
			gap: $mol_gap.text,
			alignItems: 'center',
			flex: {
				grow: 1,
			},
		},

		Author_avatar: {
			width: '2rem',
			height: '2rem',
			background: {
				size: [ 'cover' ],
				position: 'center',
				color: $mol_theme.field,
			},
			border: {
				radius: '50%',
			},
			overflow: 'hidden',
		},

		State: {
			font: {
				size: '.8rem',
			},
			color: $mol_theme.control,
		},

		Date_text: {
			font: {
				size: '.8rem',
			},
			color: $mol_theme.shade,
		},

		Title_field: {
			font: {
				size: '1.75rem',
				weight: 'bold',
			},
		},

		Title_text: {
			font: {
				size: '2rem',
				weight: 'bold',
			},
		},

		Tags_text: {
			flex: {
				wrap: 'wrap',
			},
			gap: $mol_gap.text,
		},

		Body_editor: {
			minHeight: '20rem',
		},

		Actions: {
			gap: $mol_gap.text,
			alignItems: 'center',
		},

		Like_button: {
			gap: $mol_gap.text,
		},

		Comments: {
			gap: $mol_gap.block,
			margin: {
				top: $mol_gap.block,
			},
		},

		Comment_form: {
			flexDirection: 'column',
			gap: $mol_gap.text,
			'@media': {
				'(min-width: 40rem)': {
					flexDirection: 'row',
				},
			},
		},

		Comment_input: {
			flex: {
				grow: 1,
			},
			minHeight: '4rem',
		},

		Comment: {
			flexDirection: 'row',
			alignItems: 'flex-start',
		},

		Comment_indent: {
			flex: {
				shrink: 0,
			},
		},

		Comment_card: {
			width: '100%',
			minWidth: 0,
		},

		Comment_head: {
			gap: $mol_gap.text,
			alignItems: 'center',
		},

		Comment_author: {
			width: '1.5rem',
			height: '1.5rem',
			border: {
				radius: '50%',
			},
			overflow: 'hidden',
		},

		Comment_date: {
			font: {
				size: '.8rem',
			},
			color: $mol_theme.shade,
		},

		Comment_text: {
			whiteSpace: 'pre-wrap',
		},

	} )

}
