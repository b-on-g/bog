// That's it. The entire state management.

namespace $.$$ {
  export class $my_profile extends $.$my_profile {

    @$mol_mem
    name( next?: string ) {
      return next ?? ''     // auto-cached, auto-tracked
    }

    @$mol_mem
    email( next?: string ) {
      return next ?? ''
    }

    @$mol_mem
    title() {
      return `Profile — ${ this.name() }`
      // updates automatically when name() changes
      // no useEffect, no watch, no subscribe
    }

  }
}
