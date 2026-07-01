namespace $.$$ {

	/**
	 * Минимальный репро "phantom Not translated to X" warn'а после `$mol_test`-теста.
	 *
	 * Смысл: `start()` синхронно ставит цепочку `setTimeout(tick, 100)` × 3.
	 * Последний tick читает `this.title()` — auto-gen accessor от `@`-декларации
	 * в view.tree, который под капотом делает `$mol_locale.text('$bog_langleak_title')`.
	 *
	 * В тесте (`langleak.test.ts`) `$mol_test` создаёт свежий `$` контекст,
	 * тест синхронно завершается, `$` destroy'ится. Но голый браузерный `setTimeout`
	 * НЕ отменяется — цепочка догоняет мёртвый контекст через ~300мс, зовёт
	 * `title()` в разрушенном `$mol_locale`, wire ретраит fetch локали, `$mol_fail_catch`
	 * ловит уже-catched promise → `texts()` падает в `return {}` → dict пустой →
	 * `console.warn('Not translated to "<lang>": $bog_langleak_title')`.
	 *
	 * ФИКС: заменить `setTimeout` на `new this.$.$mol_after_timeout(100, () => ...)` —
	 * wire-aware таймер, destroy контекста автоматически отменяет pending callbacks.
	 */
	export class $bog_langleak extends $.$bog_langleak {

		@ $mol_mem
		override lang_label() {
			return this.$.$mol_locale.lang() === 'ru' ? 'EN' : 'RU'
		}

		@ $mol_action
		override lang_toggle() {
			const cur = this.$.$mol_locale.lang()
			this.$.$mol_locale.lang( cur === 'ru' ? 'en' : 'ru' )
			return null
		}

		@ $mol_action
		override start() {
			this.tick( 0 )
			return null
		}

		tick( n: number ) {
			if( n >= 3 ) {
				// Последний шаг: читаем @-локализованную строку.
				// В нормальной жизни — просто вернёт перевод.
				// Если это докрутилось после $mol_test-destroy → warn.
				console.log( '[tick done] title:', this.title() )
				return
			}
			// Голый setTimeout — источник утечки за пределы жизненного цикла $.
			// Замени на:  new this.$.$mol_after_timeout( 1, () => this.tick( n + 1 ) )
			setTimeout( () => this.tick( n + 1 ), 1 )
		}

	}

}
