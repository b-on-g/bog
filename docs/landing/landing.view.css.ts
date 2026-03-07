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

		Props: {
			flex: {
				wrap: 'wrap',
			},
			justify: {
				content: 'center',
			},
			gap: '1.5rem',
			padding: {
				top: '2rem',
				bottom: '3rem',
				left: '2rem',
				right: '2rem',
			},
		},

		Prop_reactive: {
			flex: {
				direction: 'column',
				basis: '250px',
				grow: 1,
				shrink: 1,
			},
			maxWidth: '350px',
			padding: $mol_gap.block,
			border: {
				style: 'solid',
				width: '1px',
				color: $mol_theme.line,
				radius: $mol_gap.round,
			},
			gap: '0.5rem',
		},

		Prop_composable: {
			flex: {
				direction: 'column',
				basis: '250px',
				grow: 1,
				shrink: 1,
			},
			maxWidth: '350px',
			padding: $mol_gap.block,
			border: {
				style: 'solid',
				width: '1px',
				color: $mol_theme.line,
				radius: $mol_gap.round,
			},
			gap: '0.5rem',
		},

		Prop_lightweight: {
			flex: {
				direction: 'column',
				basis: '250px',
				grow: 1,
				shrink: 1,
			},
			maxWidth: '350px',
			padding: $mol_gap.block,
			border: {
				style: 'solid',
				width: '1px',
				color: $mol_theme.line,
				radius: $mol_gap.round,
			},
			gap: '0.5rem',
		},

		Prop_reactive_icon: {
			font: {
				size: '2rem',
			},
		},

		Prop_composable_icon: {
			font: {
				size: '2rem',
			},
		},

		Prop_lightweight_icon: {
			font: {
				size: '2rem',
			},
		},

		Prop_reactive_title: {
			font: {
				size: '1.25rem',
				weight: 'bold',
			},
			color: $mol_theme.text,
		},

		Prop_composable_title: {
			font: {
				size: '1.25rem',
				weight: 'bold',
			},
			color: $mol_theme.text,
		},

		Prop_lightweight_title: {
			font: {
				size: '1.25rem',
				weight: 'bold',
			},
			color: $mol_theme.text,
		},

		Prop_reactive_text: {
			color: $mol_theme.shade,
		},

		Prop_composable_text: {
			color: $mol_theme.shade,
		},

		Prop_lightweight_text: {
			color: $mol_theme.shade,
		},

		Demo: {
			flex: {
				direction: 'column',
			},
			align: {
				items: 'center',
			},
			padding: {
				top: '2rem',
				bottom: '3rem',
				left: '2rem',
				right: '2rem',
			},
			gap: '1rem',
		},

		Demo_title: {
			font: {
				size: '1.5rem',
				weight: 'bold',
			},
			color: $mol_theme.text,
		},

		Demo_subtitle: {
			color: $mol_theme.shade,
			textAlign: 'center',
		},

		Demo_editor: {
			width: '100%',
			maxWidth: '800px',
			border: {
				style: 'solid',
				width: '1px',
				color: $mol_theme.line,
				radius: $mol_gap.round,
			},
			padding: $mol_gap.block,
		},

		Ecosystem: {
			flex: {
				direction: 'column',
			},
			align: {
				items: 'center',
			},
			padding: {
				top: '2rem',
				bottom: '2rem',
				left: '2rem',
				right: '2rem',
			},
			gap: '1.5rem',
		},

		Ecosystem_title: {
			font: {
				size: '1.5rem',
				weight: 'bold',
			},
			color: $mol_theme.text,
		},

		Ecosystem_links: {
			flex: {
				wrap: 'wrap',
			},
			justify: {
				content: 'center',
			},
			gap: '1rem',
		},

		Link_mam: {
			padding: {
				top: '0.5rem',
				bottom: '0.5rem',
				left: '1.5rem',
				right: '1.5rem',
			},
			border: {
				style: 'solid',
				width: '1px',
				color: $mol_theme.line,
				radius: $mol_gap.round,
			},
			color: $mol_theme.control,
		},

		Link_giper: {
			padding: {
				top: '0.5rem',
				bottom: '0.5rem',
				left: '1.5rem',
				right: '1.5rem',
			},
			border: {
				style: 'solid',
				width: '1px',
				color: $mol_theme.line,
				radius: $mol_gap.round,
			},
			color: $mol_theme.control,
		},

		Link_components: {
			padding: {
				top: '0.5rem',
				bottom: '0.5rem',
				left: '1.5rem',
				right: '1.5rem',
			},
			border: {
				style: 'solid',
				width: '1px',
				color: $mol_theme.line,
				radius: $mol_gap.round,
			},
			color: $mol_theme.control,
		},

		Link_tauri: {
			padding: {
				top: '0.5rem',
				bottom: '0.5rem',
				left: '1.5rem',
				right: '1.5rem',
			},
			border: {
				style: 'solid',
				width: '1px',
				color: $mol_theme.line,
				radius: $mol_gap.round,
			},
			color: $mol_theme.control,
		},

		Footer: {
			flex: {
				direction: 'column',
			},
			align: {
				items: 'center',
			},
			padding: {
				top: '2rem',
				bottom: '2rem',
				left: '2rem',
				right: '2rem',
			},
			border: {
				top: {
					style: 'solid',
					width: '1px',
					color: $mol_theme.line,
				},
			},
		},

		Footer_links: {
			gap: '2rem',
			justify: {
				content: 'center',
			},
			flex: {
				wrap: 'wrap',
			},
		},

		Link_github: {
			color: $mol_theme.shade,
		},

		Link_docs: {
			color: $mol_theme.shade,
		},

		Link_community: {
			color: $mol_theme.shade,
		},

	} )

}
