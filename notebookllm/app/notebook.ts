namespace $ {

	// Документ с чанками и эмбеддингами
	export class $bog_notebookllm_doc extends $giper_baza_flex_subj.with({
		Content: $giper_baza_atom_text,
		Chunks: $giper_baza_list_str,
		// Embeddings хранятся как JSON строка
		Embeddings_json: $giper_baza_atom_text,
	}, 'NotebookLLM_Doc' ) {

		embeddings(): number[][] {
			const json = this.Embeddings_json()?.val()
			if( !json ) return []
			try {
				return JSON.parse( json )
			} catch {
				return []
			}
		}

		embeddings_set( emb: number[][] ) {
			this.Embeddings_json( null )!.val( JSON.stringify( emb ) )
		}

	}

	// Сообщение чата
	export class $bog_notebookllm_message extends $giper_baza_flex_subj.with({
		Role: $giper_baza_atom_text,
		Content: $giper_baza_atom_text,
	}, 'NotebookLLM_Message' ) {}

	// Ноутбук
	export class $bog_notebookllm_notebook extends $giper_baza_flex_subj.with({
		Docs: $giper_baza_list_link_to( () => $bog_notebookllm_doc ),
		Messages: $giper_baza_list_link_to( () => $bog_notebookllm_message ),
		Digest: $giper_baza_atom_text,
		Dialog_title: $giper_baza_atom_text,
	}, 'NotebookLLM_Notebook' ) {}

	// Корневое хранилище (home)
	export class $bog_notebookllm_store extends $giper_baza_flex_subj.with({
		Notebooks: $giper_baza_list_link_to( () => $bog_notebookllm_notebook ),
		Current_notebook: $giper_baza_atom_link_to( () => $bog_notebookllm_notebook ),
	}, 'NotebookLLM_Store' ) {}

}
