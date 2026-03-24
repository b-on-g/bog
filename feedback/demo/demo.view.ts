namespace $.$$ {

	export class $bog_feedback_demo extends $.$bog_feedback_demo {

		topic() {
			const land = this.$.$giper_baza_glob.land_grab( [
				[ null, $giper_baza_rank_post( 'late' ) ],
			] )
			const topic = land.Data( $bog_feedback ) as $bog_feedback
			if( !topic.Title()?.val() ) {
				topic.Title( 'auto' )!.val( 'Feedback' )
			}
			return topic
		}

	}

}
