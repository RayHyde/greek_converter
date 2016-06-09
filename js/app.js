/* ----------------------------------------------------------------------

* File name:		app.js
* Version:			1.1
* Description:	converts greek letters to latin ones and includes a quiz
* Website: 			rayhyde.nl/eurotech.nl
* Version:			19-11-2015
* Author:				Ray Hyde - www.rayhyde.nl

---------------------------------------------------------------------- */
$(document).ready(function() {
	
	// set some initial vars
	var	$keys = $('#keys'),
			$latin = $('#latin span'),
			$greek = $('#greek span'),
			$textWindow = $('.text-window span'),
			caps = false,
			speed = 300,
			letter, which;
	
	//build the list of characters
	var keys = [
							{ lt: "A", gr: "Α" },
							{ lt: "B", gr: "Β" },
							{ lt: "G", gr: "Γ" },
							{ lt: "D", gr: "Δ" },
							{ lt: "E", gr: "Ε" },
							{ lt: "Z", gr: "Ζ" },
							{ lt: "I", gr: "Η" },
							{ lt: "Th", gr: "Θ" },
							{ lt: "I", gr: "Ι" },
							{ lt: "K", gr: "Κ" },
							{ lt: "L", gr: "Λ" },
							{ lt: "M", gr: "Μ" },
							{ lt: "N", gr: "Ν" },
							{ lt: "Ks", gr: "Ξ" },
							{ lt: "O", gr: "Ο" },
							{ lt: "P", gr: "Π" },
							{ lt: "R", gr: "Ρ" },
							{ lt: "S", gr: "Σ" },
							{ lt: "T", gr: "Τ" },
							{ lt: "Y", gr: "Υ" },
							{ lt: "Ph", gr: "Φ" },
							{ lt: "Ch", gr: "Χ" },
							{ lt: "Ps", gr: "Ψ" },
							{ lt: "O", gr: "Ω" },
							{ lt: "a", gr: "α" },
							{ lt: "b", gr: "β" },
							{ lt: "g", gr: "γ" },
							{ lt: "d", gr: "δ" },
							{ lt: "e", gr: "ε" },
							{ lt: "z", gr: "ζ" },
							{ lt: "i", gr: "η" },
							{ lt: "th", gr: "θ" },
							{ lt: "i", gr: "ι" },
							{ lt: "k", gr: "κ" },
							{ lt: "l", gr: "λ" },
							{ lt: "m", gr: "μ" },
							{ lt: "n", gr: "ν" },
							{ lt: "ks", gr: "ξ" },
							{ lt: "o", gr: "ο" },
							{ lt: "p", gr: "π" },
							{ lt: "r", gr: "ρ" },
							{ lt: "s", gr: "σ" },
							{ lt: "s", gr: "ς" },
							{ lt: "t", gr: "τ" },
							{ lt: "y", gr: "υ" },
							{ lt: "ph", gr: "φ" },
							{ lt: "ch", gr: "χ" },
							{ lt: "ps", gr: "ψ" },
							{ lt: "o", gr: "ω" }
						];
	

	/////*** KEYBOARD ***/////
	// this is the main part of the app - converting Greek letters to latin
	
	// create the keyboard live, maybe we want to do other languages later
	for ( var i=0;i< keys.length;i++ ) {
		if ( i < 24 ) {
			$keys.find('.uc').append('<li>'+ keys[i].gr + '</li>');
		} else {
			$keys.find('.lc').append('<li>'+ keys[i].gr + '</li>');
		}
	}
	
	/*** EVENTS ***/
	// show the upper or lower case keyboards
	$('#keys .caps').on('click', function() {
		$(this).toggleClass('answer');
		if ( caps == false) {
			$('#keys .lc').fadeOut(speed, function() {
				$('#keys .uc').fadeIn(speed);
			});
			caps = true;
		} else {
			$('#keys .uc').fadeOut(speed, function() {
				$('#keys .lc').fadeIn(speed);
			});
			caps = false;
		}
	});
	
	// this happens when a letter key is clicked
	
	// the letters are encapsulated in the old <i> tag, this
	// makes them easy to handle when they contain a pair of
	// characters, e.g. "ψ" equals two charecters: "ps"
	$('#keys .uc li, #keys .lc li').on('click', function() {
		which = $(this).index('#keys li' );
		letter = '<i>' + keys[which].gr + '</i>';
		$greek.append(letter);
		letter = '<i>' + keys[which].lt + '</i>';
		$latin.append(letter);
	});
	
	// the backspace deletes the last <i> tag so there will
	// be no mismatch between single or paired characters
	$('#keys .backspace').click(function() {
		$textWindow.find('i:last-child').remove();
	});
	
	// a space adds, well, a space...
	$('#keys .space').click(function() {
		$textWindow.append('<i> </i>');
	});
	
	// the clear button clears all text
	$('.clear').click(function() {
		$textWindow.html('');
	});
	
		
	/////*** TESTER ***/////
	// this is the quiz game

	
	/*** INITIALS ***/
	var	$score = $('#score'),
			$turns = $('.turns span'),
			$totals = $('.totals span'),
			answerButtons = [],
			answerButtonsLength = 4,
			$answerButtons = $('#answer-buttons'),
	 		bigLetters = [],
			score, beginScore, turns, buttonLetters, oldScore, letterNumber, buttonNumber, present, bigPresent;
	
	/*** FUNCTIONS ***/
	
	function resetAll() {
		score = 0;
		buttonLetters = [];
		bigLetters = [];
		// make the quiz last as long as there are different letters in the alphabet:
		turns = keys.length + 1;
		answerButtons = [];
		$answerButtons.html('');
		
		// check if local storage is possible
		// if so, then keep high scores
		if( typeof(Storage) == "undefined" ) {
			$('.highscore').hide();
		} else {
			oldScore = parseInt(localStorage.getItem('greekHighscore') );
			if ( oldScore >= 0) {
				$('.highscore span').text(oldScore);
			}
		}
		$turns.text(turns);
		$score.text(score);
		beginScore = turns;
		$totals.html('');
		$('.totals .btn').hide();
	}
	resetAll();
	
	// function to choose random alphabet number
	function randomLetter() {
		letterNumber = Math.floor(Math.random() * keys.length);
	}
	
	// function to choose one of the answer buttons
	function randomButton() {
		buttonNumber = 1 + Math.floor(Math.random() * answerButtonsLength);
	}
	
	// set buttons
	function setButtons() {
		
		// reset the four keys that were chosen to be ready for next time
		buttonLetters = [];
		answerButtons = [];
		$answerButtons.html('');
		
		
		// first randomly select a new big letter, making
		// sure it was not chosen before
		function getBigLetter() {
			
			var isReady = 0;
			while (isReady == 0) {
				randomLetter();
				// check if letter already exists on a button
				bigPresent = $.inArray( letterNumber, bigLetters );

				if ( bigPresent == -1) {

					// put the big letter into its big box...
					$('.tester .big-letter').text(keys[letterNumber].gr);

					// stick the big letter, that the user is tested on, into an 
					// array so we can later check if it has been used before
					bigLetters.push(letterNumber);

					// put the number in a small array so we can check
					// if there are no duplicate answer buttons
					buttonLetters.push(letterNumber);

					// put the answer button in the row
					answerButtons.push('<button class="btn btn-large btn-primary correct" data-letter="'+letterNumber+'">'+keys[letterNumber].lt+'</button>');
					isReady = 1;
				}
			}
			
		}
		getBigLetter();
		

		// then choose three other random letters
		// making sure there are no duplicates
		for ( var i=0;i< answerButtonsLength - 1;	i++ ) {

			function getButton() {
				var isReady = 0;
				while ( isReady == 0) {
					randomLetter();
					// check if letter already exists on a button
					present = $.inArray( letterNumber, buttonLetters );
					
					if ( present == -1) {
						
						buttonLetters.push(letterNumber);
						answerButtons.push('<button class="btn btn-large btn-primary" data-letter="'+letterNumber+'">'+keys[letterNumber].lt+'</button>');
						isReady = 1

					}
				}
			}
			getButton();

		}
		
		// this shuffles the answer buittons in their array
		function Shuffle(o) {
			for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
			return o;
		};
		
		Shuffle(answerButtons);

		// then sticks them in the DOM
		$answerButtons.append(answerButtons);
		
	}

	/* EVENTS */
	// as the answer buttons are generated live, we need
	// to delegate their click events
	$answerButtons.on('click', '.btn', function() {
		$totals.html('');
		
		// check if we are not done yet with the quiz
		if (turns > 0) {
			
			turns --;
			$turns.text(turns);
			if ( $(this).hasClass('correct') ) {
				score ++;
				$totals.html('<div class="answer ok">Excellent!</div>')
				setButtons();
			} else {
				$totals.html('<div class="answer error">Oh dear... Try again.</div>');
			}

			$score.text(score);
			
			if (turns == 0) {
				var es = (score/beginScore) * 100;
				var mwah;
				if ( es < 29) {					
					mwah = 'Oh my goodness!';
				} else if (es > 29 && es < 50) {
					mwah = 'This still needs some work...';					
				} else if ( es > 49 && es < 70) {
					mwah = 'Not half bad... ';				
				} else if ( es > 69 && es < 90) {
					mwah = 'Great!';					
				} else if ( es >= 90) {
					mwah = 'You cheat! You must be Greek!';					
				}
				
				if ( oldScore >= 0 ) {
					if ( score > oldScore ) {
						localStorage.setItem('greekHighscore', score);
						$('.highscore span').text(score);
					}
				} else {
					localStorage.setItem('greekHighscore', score);
				}
				$totals.html(mwah + ' You scored <strong>' + es.toFixed(1) + '%</strong>.');
				$('.totals .btn').fadeIn();
			}
		}
	});
	
	$('.row').on('click', '.play', function() {
		resetAll();
		setButtons();
	});
	
	
});