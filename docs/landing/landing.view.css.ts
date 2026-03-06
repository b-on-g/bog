namespace $.$$ {

	$mol_style_define( $bog_docs_landing, {

		Hero: {
			flex: {
				direction: 'column',
			},
			align: {
				items: 'center',
			},
			justify: {
				content: 'center',
			},
			padding: {
				top: '4rem',
				bottom: '4rem',
				left: '2rem',
				right: '2rem',
			},
			gap: '1.5rem',
			textAlign: 'center',
		},

		Hero_title: {
			font: {
				size: '2.5rem',
				weight: 'bold',
			},
			color: $mol_theme.text,
		},

		Hero_subtitle: {
			font: {
				size: '1.25rem',
			},
			color: $mol_theme.shade,
		},

		Hero_actions: {
			gap: '1rem',
			justify: {
				content: 'center',
			},
			flex: {
				wrap: 'wrap',
			},
		},

		Get_started: {
			padding: {
				top: '0.75rem',
				bottom: '0.75rem',
				left: '2rem',
				right: '2rem',
			},
			background: {
				color: $mol_theme.control,
			},
			color: $mol_theme.back,
			border: {
				radius: $mol_gap.round,
			},
			font: {
				weight: 'bold',
				size: '1rem',
			},
		},

		Play_link: {
			padding: {
				top: '0.75rem',
				bottom: '0.75rem',
				left: '2rem',
				right: '2rem',
			},
			border: {
				style: 'solid',
				width: '2px',
				color: $mol_theme.control,
				radius: $mol_gap.round,
			},
			color: $mol_theme.control,
			font: {
				weight: 'bold',
				size: '1rem',
			},
		},

	} )

}
