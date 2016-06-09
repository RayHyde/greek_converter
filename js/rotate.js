$(document).ready(function () {

	var $mark = $('[class^=mark]');
	var step = 360 / $mark.length;
	
	for (var i = 0; i < $mark.length; i++) {
		
		$mark.eq(i).css('transform', 'rotate(' + (i * step) + 'deg)').attr('data-deg', (i * step));
	}


	$('button').click(function () {

		for ( var i=0;i< $mark.length;i++ ) {
			var $thisMark = $mark.eq(i);
			var dataDeg = parseInt( $thisMark.attr('data-deg') );
			function rotator(degree) {
				$thisMark.css({
						'-webkit-transform': 'rotate(' + degree + 'deg)',
						'-moz-transform': 'rotate(' + degree + 'deg)',
						'-ms-transform': 'rotate(' + degree + 'deg)',
						'-o-transform': 'rotate(' + degree + 'deg)',
						'transform': 'rotate(' + degree + 'deg)',
						'zoom': 1
				}, 1000);
				var targetRotation, currentRotation;
				if (targetRotation < currentRotation) {
					targetRotation += 360;
				}
				if ( degree == 360) {
					$thisMark.attr('data-deg', '0');
				} else {
					$thisMark.attr('data-deg', step + dataDeg);
				}
			}

			rotator(step + dataDeg);
		}
		

		
//		for (var i = 0; i < $mark.length; i++) {
//			var degNew = parseInt($mark.eq(i).attr('data-deg'));
//			console.log('degNew: ' + degNew);
//			if ( degNew == 315) {
//				$mark.eq(i).css('transform', 'rotate(0deg)').attr('data-deg', 0);
//			} else {				
//				$mark.eq(i).css('transform', 'rotate(' + (degNew + deg) + 'deg)').attr('data-deg', (i * deg) + degNew);
//			}
//		}
	});
});