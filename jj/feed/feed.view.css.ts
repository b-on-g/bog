namespace $.$$ {

	$mol_style_define( $bog_jj_feed, {
		width: '100%',
		maxWidth: '64rem',
		margin: {
			left: 'auto',
			right: 'auto',
		},

		Body_content: {
			flexDirection: 'column',
			gap: $mol_gap.block,
		},

		My_blogs: {
			gap: $mol_gap.text,
		},

		My_blogs_head: {
			font: {
				size: '1.25rem',
				weight: 'bold',
			},
		},

		My_blogs_list: {
			flex: {
				wrap: 'wrap',
			},
			gap: $mol_gap.block,
		},

		My_blog: {
			gap: $mol_gap.text,
			alignItems: 'center',
			padding: $mol_gap.text,
			background: {
				color: $mol_theme.card,
			},
			border: {
				radius: $mol_gap.round,
			},
		},

		My_blog_avatar: {
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

		Tags: {
			flex: {
				wrap: 'wrap',
			},
			gap: $mol_gap.text,
			margin: {
				top: $mol_gap.block,
			},
		},

		Tag: {
			color: $mol_theme.control,
			font: {
				size: '.85rem',
			},
		},

		Feed: {
			gap: $mol_gap.block,
			margin: {
				top: $mol_gap.block,
			},
		},

		Feed_head: {
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
