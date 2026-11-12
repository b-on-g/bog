namespace $.$$ {

	$mol_style_define( $bog_jj_blog, {
		width: '100%',
		maxWidth: '64rem',
		margin: {
			left: 'auto',
			right: 'auto',
		},

		Tools_content: {
			gap: $mol_gap.text,
		},

		Hero: {
			position: 'relative',
			flexDirection: 'column',
			gap: $mol_gap.block,
			padding: $mol_gap.block,
			justifyContent: 'flex-end',
		},

		Hero_cover: {
			position: 'absolute',
			left: 0,
			top: 0,
			width: '100%',
			height: '100%',
			background: {
				size: [ 'cover' ],
				position: 'center',
				color: $mol_theme.field,
			},
			border: {
				radius: $mol_gap.round,
			},
		},

		Hero_info: {
			position: 'relative',
			gap: $mol_gap.text,
			flex: {
				grow: 1,
			},
		},

		Hero_content: {
			position: 'relative',
			gap: $mol_gap.block,
			alignItems: 'flex-end',
		},

		Hero_avatar: {
			width: '5rem',
			height: '5rem',
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

		Blog_title: {
			font: {
				size: '1.75rem',
				weight: 'bold',
			},
		},

		Blog_meta: {
			color: 'inherit',
			opacity: .75,
			font: {
				size: '.85rem',
			},
		},

		Socials: {
			flex: {
				wrap: 'wrap',
			},
			gap: $mol_gap.text,
		},

		Social_link: {
			color: 'inherit',
			opacity: .85,
			font: {
				size: '.85rem',
			},
		},

		Posts: {
			gap: $mol_gap.block,
			margin: {
				top: $mol_gap.block,
			},
		},

		Posts_head: {
			font: {
				size: '1.25rem',
				weight: 'bold',
			},
		},

		Cards: {
			gap: $mol_gap.block,
		},

	} )

}
