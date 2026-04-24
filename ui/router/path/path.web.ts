namespace $ {

	/**
	 * Path-based router: replaces hash routing (`#!k=v/k=v`) with pathname routing (`/base/k=v/k=v`).
	 * Install by referencing `$bog_ui_router_path` in your app — it overrides `$mol_state_arg` on load.
	 * Requires `404.html` with matching SPA redirect trick for GitHub Pages.
	 */
	export class $bog_ui_router_path extends $mol_state_arg {

		@ $mol_mem
		static base(): string {
			const script = $mol_dom.document.querySelector( 'script[src$="web.js"]' ) as HTMLScriptElement | null
			if( script && script.src ) {
				return new URL( script.src ).pathname.replace( /web\.js$/ , '' )
			}
			const p = $mol_dom.location.pathname
			return p.endsWith( '/' ) ? p : p.replace( /[^/]*$/ , '' )
		}

		@ $mol_mem
		static href( next?: string ): string {
			if( next === undefined ) {
				const segment = decodeURIComponent( $mol_dom.location.pathname ).slice( this.base().length )
				return $mol_dom.location.origin + this.base() + '#!' + segment
			}
			const i = next.indexOf( '#!' )
			const segment = i >= 0 ? next.slice( i + 2 ) : ( next.indexOf( '#' ) >= 0 ? next.slice( next.indexOf( '#' ) + 1 ) : '' )
			const target = this.base() + segment
			new $mol_after_frame( () => {
				const current = decodeURIComponent( $mol_dom.location.pathname )
				if( current === decodeURIComponent( target ) ) return
				$mol_dom.history.replaceState( $mol_dom.history.state , $mol_dom.document.title , target )
			} )
			return next
		}

		@ $mol_action
		static commit(): void {
			const segment = decodeURIComponent( $mol_dom.location.pathname ).slice( this.base().length )
			$mol_dom.history.pushState( $mol_dom.history.state , $mol_dom.document.title , this.base() + segment )
		}

		@ $mol_action
		static go( next: Record<string, string | null> ): void {
			const link = this.link( next )
			const i = link.indexOf( '#!' )
			const segment = i >= 0 ? link.slice( i + 2 ) : ''
			$mol_dom.history.pushState( null , '' , this.base() + segment )
			this.href( $mol_dom.location.origin + this.base() + '#!' + segment )
		}

	}

	// Skip activation on localhost / dev servers — pathname routing requires a SPA-aware
	// server (404.html fallback) which local MAM dev doesn't provide. Hash routing stays.
	;( function activate() {

		const is_local = /^(localhost$|127\.|\[::1\]|0\.0\.0\.0)/.test( $mol_dom.location.hostname )
		if( is_local ) return

		// Install as the default $mol_state_arg so all $mol_link / view code picks up our class.
		;( $ as any ).$mol_state_arg = $bog_ui_router_path

		// Inject <base href> so relative URLs (Giper Baza `?BAZA:file=...`, assets) resolve
		// against the mount directory, not the current (possibly deep) pathname.
		const href = $bog_ui_router_path.base()
		const doc = $mol_dom.document
		let base_el = doc.querySelector( 'base' ) as HTMLBaseElement | null
		if( !base_el ) {
			base_el = doc.createElement( 'base' )
			doc.head.insertBefore( base_el , doc.head.firstChild )
		}
		base_el.setAttribute( 'href' , href )

		// Decode path encoded by 404.html (`/base/?/foo=bar/baz=qux` -> `/base/foo=bar/baz=qux`).
		const s = $mol_dom.location.search
		if( s.length > 1 && s.charAt( 1 ) === '/' ) {
			const decoded = s.slice( 2 ).split( '&' ).map( p => p.replace( /~and~/g , '&' ) ).join( '?' )
			const parts = decoded.split( '?' )
			const path_segment = parts[ 0 ]
			const query = parts[ 1 ] ? '?' + parts[ 1 ] : ''
			$mol_dom.history.replaceState( null , '' , href + path_segment + query + $mol_dom.location.hash )
		}

		// Back/forward button support.
		self.addEventListener( 'popstate' , () => {
			$bog_ui_router_path.href(
				$mol_dom.location.origin + $bog_ui_router_path.base() + '#!' +
				decodeURIComponent( $mol_dom.location.pathname ).slice( $bog_ui_router_path.base().length )
			)
		} )

		// Intercept same-origin link clicks so $mol_link navigations don't reload the page.
		self.addEventListener( 'click' , ( e: MouseEvent ) => {
			if( e.defaultPrevented ) return
			if( e.button !== 0 ) return
			if( e.metaKey || e.ctrlKey || e.shiftKey || e.altKey ) return

			let el = e.target as HTMLElement | null
			while( el && el.tagName !== 'A' ) el = el.parentElement
			if( !el ) return

			const a = el as HTMLAnchorElement
			if( a.hasAttribute( 'download' ) ) return
			if( a.target && a.target !== '' && a.target !== '_self' ) return
			if( a.origin !== $mol_dom.location.origin ) return

			const mount = $bog_ui_router_path.base()
			if( !a.pathname.startsWith( mount ) ) return

			// $mol_link emits `<a href="…/#!key=val">`. Convert hash segment to pathname.
			// Non-routed hash (e.g. `#section` for scroll) — let the browser handle.
			let segment: string
			if( a.hash.startsWith( '#!' ) ) {
				segment = a.hash.slice( 2 )
			} else if( a.hash ) {
				return
			} else {
				segment = decodeURIComponent( a.pathname ).slice( mount.length )
			}

			e.preventDefault()

			const target = mount + segment + a.search
			const current = $mol_dom.location.pathname + $mol_dom.location.search
			if( target === current ) return

			$mol_dom.history.pushState( null , '' , target )
			$bog_ui_router_path.href( $mol_dom.location.origin + mount + '#!' + segment )
		} , true )

	} )()

}
