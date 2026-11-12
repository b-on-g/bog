namespace $.$$ {

	$mol_style_define( $bog_jj_card, {
		overflow: 'hidden',
		gap: 0,
		cursor: 'pointer',

		Cover: {
			display: 'block',
			minHeight: '10rem',
			background: {
				color: $mol_theme.field,
			},
		},

		Cover_image: {
			minHeight: '10rem',
			background: {
				size: [ 'cover' ],
				position: 'center',
			},
		},

		Info: {
			gap: $mol_gap.text,
			padding: $mol_gap.block,
		},

		Tags: {
			flex: {
				wrap: 'wrap',
			},
			gap: $mol_gap.text,
		},

		Tag: {
			minHeight: 0,
			padding: {
				top: 0,
				bottom: 0,
				left: $mol_gap.text,
				right: $mol_gap.text,
			},
			font: {
				size: '.8rem',
			},
			color: $mol_theme.control,
		},

		Title: {
			font: {
				weight: 'bold',
				size: '1.25rem',
			},
			color: $mol_theme.text,
		},

		Excerpt: {
			color: $mol_theme.shade,
		},

		Meta: {
			gap: $mol_gap.text,
			alignItems: 'center',
			font: {
				size: '.85rem',
			},
			color: $mol_theme.shade,
		},

		Likes: {
			gap: $mol_gap.text,
			alignItems: 'center',
			margin: {
				left: 'auto',
			},
		},

		Likes_icon: {
			width: '.9rem',
			height: '.9rem',
		},

	} )

}
