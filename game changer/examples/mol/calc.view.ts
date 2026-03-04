namespace $.$$ {
	export class $mol_calc extends $.$mol_calc {

		// If a() or b() contain invalid values — this throws.
		// But in $mol, the error is AUTOMATICALLY caught and shown
		// ONLY in the Result component. Inputs keep working.
		// The user can fix the error. No ErrorBoundary needed.
		// No try/catch. No manual error state. It just works.

		@$mol_mem
		result() {
			const a = this.a()      // can be NaN
			const b = this.b()      // can be NaN

			if ( Number.isNaN(a) ) throw new Error( '"A" is not a number' )
			if ( Number.isNaN(b) ) throw new Error( '"B" is not a number' )

			return `${ a } + ${ b } = ${ a + b }`
		}

		// That's it. No ErrorBoundary. No try/catch.
		// $mol automatically:
		// 1. Catches the error in result()
		// 2. Shows it ONLY where result is rendered
		// 3. Keeps all other components alive and interactive
		// 4. Re-computes result() when inputs change
		// 5. Recovers automatically when input becomes valid again

	}
}
