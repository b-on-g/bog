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
		maxWidth: '400px',
		width: '100%',
		pointerEvents: 'none',

		Toast: {
			pointerEvents: 'auto',
		},

	} )

}
