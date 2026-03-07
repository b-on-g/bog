namespace $.$$ {

	const d = '$'

	export class $bog_docs_landing extends $.$bog_docs_landing {

		@$mol_mem
		override demo_source( next?: string ) {
			return next ?? [
				`${d}my_counter ${d}mol_page`,
				`\ttitle \\My Counter`,
				`\tbody /`,
				`\t\t<= Count ${d}mol_number`,
				`\t\t\tvalue? <=> count? 0`,
				`\t\t<= Reset ${d}mol_button_major`,
				`\t\t\ttitle \\Reset`,
				`\t\t\tclick? <=> reset? null`,
			].join( '\n' )
		}

	}

}
