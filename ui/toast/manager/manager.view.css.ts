namespace $ {

	$mol_style_define( $bog_ui_toast_manager, {

		position: 'fixed',
		bottom: '1rem',
		right: '1rem',
		display: 'flex',
		flex: {
			direction: 'column',
		},
		gap: '.5rem',
		zIndex: 9999,
		maxHeight: '100vh',
		pointerEvents: 'none',

		Toast: {
			pointerEvents: 'auto',
		},

	} )

}
