export default function() {
	/**
	 * 共通
	 */

	// onload
	$(window).on('load', function() {});

	// resize
	$(window).on('resize', function() {});

	/*
  ページ内スクロール
  -----------------------------------------------------*/
	$('[href^="#"]').on('click', function() {
		var target = '';
		if (this.hash.length < 1) {
			target = $('body');
		} else {
			target = $(this.hash);
		}
		if (target.length) {
			$('html,body')
				.stop(true, false)
				.animate({scrollTop: target.offset().top}, 'slow');
		}
		return false;
	});
}
