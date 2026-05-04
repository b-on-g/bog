namespace $.$$ {
	// Глобальный быстрый CSS-tooltip для любого $mol-компонента с `hint`/`title`.
	// Перехватываем mouseover на весь документ: переносим title -> data-mol-tip,
	// чтобы нативный tooltip с задержкой 700ms не показывался.
	if (typeof $mol_dom_context !== 'undefined' && $mol_dom_context.document) {
		const doc = $mol_dom_context.document
		const move_title = (el: any) => {
			if (!el || el.nodeType !== 1) return
			// Поднимаемся вверх по дереву и переносим title с любого предка —
			// hover может прилететь от вложенного <input> / <svg>, а title-атрибут
			// часто стоит на корне кнопки.
			let node: HTMLElement | null = el
			while (node) {
				const t = node.getAttribute && node.getAttribute('title')
				if (t) {
					node.setAttribute('data-mol-tip', t)
					node.removeAttribute('title')
				}
				node = node.parentElement
			}
		}
		doc.addEventListener('mouseover', (e: any) => move_title(e.target), true)
		doc.addEventListener('focusin',   (e: any) => move_title(e.target), true)
	}

	$mol_style_attach('bog/tooltip/tooltip.view.css', `
		[data-mol-tip] {
			position: relative;
		}
		[data-mol-tip]:hover::after,
		[data-mol-tip]:focus-visible::after {
			content: attr(data-mol-tip);
			position: absolute;
			z-index: 1000;
			top: calc(100% + 4px);
			left: 50%;
			transform: translateX(-50%);
			background: var(--mol_theme_card);
			color: var(--mol_theme_text);
			padding: 0.25rem 0.5rem;
			border-radius: 0.25rem;
			font-size: 0.75rem;
			line-height: 1.2;
			white-space: nowrap;
			max-width: min(80vw, 24rem);
			box-shadow: 0 2px 8px rgba(0, 0, 0, 0.18);
			pointer-events: none;
			animation: bog-tooltip-in 0.08s ease-out;
		}
		@keyframes bog-tooltip-in {
			from { opacity: 0; transform: translate(-50%, -2px); }
			to   { opacity: 1; transform: translate(-50%, 0); }
		}
	`)
}
