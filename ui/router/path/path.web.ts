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

	// Install as the default $mol_state_arg so all $mol_link / view code picks up our class.
	;( $ as any ).$mol_state_arg = $bog_ui_router_path

	// Inject <base href> so relative URLs (Giper Baza `?BAZA:file=...`, assets) resolve
	// against the mount directory, not the current (possibly deep) pathname.
	;( function install_base() {
		const href = $bog_ui_router_path.base()
		const doc = $mol_dom.document
		let base = doc.querySelector( 'base' ) as HTMLBaseElement | null
		if( !base ) {
			base = doc.createElement( 'base' )
			doc.head.insertBefore( base , doc.head.firstChild )
		}
		base.setAttribute( 'href' , href )
	} )()

	// Decode path encoded by 404.html (`/base/?/foo=bar/baz=qux` -> `/base/foo=bar/baz=qux`).
	;( function restore_spa_path() {
		const s = $mol_dom.location.search
		if( s.length > 1 && s.charAt( 1 ) === '/' ) {
			const decoded = s.slice( 2 ).split( '&' ).map( p => p.replace( /~and~/g , '&' ) ).join( '?' )
			const parts = decoded.split( '?' )
			const path_segment = parts[ 0 ]
			const query = parts[ 1 ] ? '?' + parts[ 1 ] : ''
			const base = $bog_ui_router_path.base()
			$mol_dom.history.replaceState( null , '' , base + path_segment + query + $mol_dom.location.hash )
		}
	} )()

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

		const base = $bog_ui_router_path.base()
		if( !a.pathname.startsWith( base ) ) return

		e.preventDefault()

		const href = a.pathname + a.search + a.hash
		if( href === $mol_dom.location.pathname + $mol_dom.location.search + $mol_dom.location.hash ) return

		$mol_dom.history.pushState( null , '' , href )
		$bog_ui_router_path.href(
			$mol_dom.location.origin + base + '#!' +
			decodeURIComponent( a.pathname ).slice( base.length )
		)
	} , true )

}
