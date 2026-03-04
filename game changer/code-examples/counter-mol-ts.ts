namespace $.$$ {
  export class $my_counter extends $.$my_counter {

    @$mol_mem
    count( next?: number ) {
      return next ?? 0
    }

    // Title updates automatically — no useEffect needed
    count_title() {
      return `Count: ${ this.count() }`
    }

    count_text() {
      return String( this.count() )
    }

    @$mol_action
    increment() {
      this.count( this.count() + 1 )
    }

  }
}
