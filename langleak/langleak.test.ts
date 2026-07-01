namespace $.$$ {

	$mol_test( {

		async 'setTimeout chain in start() leaks past test lifecycle → warn "Not translated"'( $ ) {
			const v = $bog_langleak.make({ $ })
			v.start()
			// Тест возвращает Promise — $mol_test_run awaits.
			// Даём event-loop'у прокрутить 3 setTimeout'а по 1мс, после — уже мёртвый $
			// (в $mol_test $ destroy'ится между тестами, а в фоне пока идут таймеры,
			// они попадают в этот интервал уничтожения).
			// Финальный tick позовёт title() в разрушенном mem-кэше $mol_locale →
			// warn: Not translated to "en": $bog_langleak_title
			await new Promise( r => setTimeout( r, 50 ) )
		},

	} )

}
