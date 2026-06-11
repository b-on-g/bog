namespace $ {

	/**
	 * BuilderUI design tokens — CSS variables in --bog_builderui_*.
	 * Used in .view.css.ts via $bog_builderui.text, $bog_builderui.back, etc.
	 */
	export const $bog_builderui = $mol_style_prop(
		'bog_builderui',
		[
			'back',
			'card',
			'field',
			'hover',
			'text',
			'shade',
			'line',
			'focus',
			'control',
			'current',
			'special',
			'font_body',
			'font_head',
			'radius',
		] as const
	)

}
