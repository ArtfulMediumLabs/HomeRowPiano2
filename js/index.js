(function(){

	// Get instrument selector and feedback elements
	var instrumentSelector = document.getElementById('instrument-selector');
	var feedback = document.getElementById('feedback');

	/**
	 * Load initial soundfont with MIDI.js
	 */
	window.onload = function () {
		MIDI.loadPlugin({
			soundfontUrl: "./includes/soundfont/",
			instrument: "acoustic_grand_piano",
			onprogress: function(state, progress) {
				console.log(state, progress);
			},
			onsuccess: function() {

				// Define piano keys
				var c3 = new Key('#c3', 50);
				var d3 = new Key('#d3', 52);
				var e3 = new Key('#e3', 54);
				var f3 = new Key('#f3', 55);
				var g3 = new Key('#g3', 57);
				var a3 = new Key('#a3', 59);
				var b3 = new Key('#b3', 61);
				var c4 = new Key('#c4', 62);

				// Listen for key presses and determine which note to play
				window.addEventListener('keypress', function(e) {
					var key = e.keyCode;
					//console.log(key);
					switch(key) {
						case 97:
							c3.play();
							break;
						case 115:
							d3.play();
							break;
						case 100:
							e3.play();
							break;
						case 102:
							f3.play();
							break;
						case 106:
							g3.play();
							break;
						case 107:
							a3.play();
							break;
						case 108:
							b3.play();
							break;
						case 59:
							c4.play();
							break;
					}
				});

				// Listen for key releases and determine which note to stop
				window.addEventListener('keyup', function(e) {
					var key = e.keyCode;
					//console.log(key);
					switch(key) {
						case 65:
							c3.release();
							break;
						case 83:
							d3.release();
							break;
						case 68:
							e3.release();
							break;
						case 70:
							f3.release();
							break;
						case 74:
							g3.release();
							break;
						case 75:
							a3.release();
							break;
						case 76:
							b3.release();
							break;
						case 186:
							c4.release();
							break;
					}
				});

				// Built instuments
				var piano = new Instrument('acoustic_grand_piano');
				var sax = new Instrument('alto_sax');

				// Listen for instrument change
				instrumentSelector.addEventListener('change', function(e) {
					var selectedInstrument = this.options[this.selectedIndex].text;
					console.log(selectedInstrument);
					switch(selectedInstrument) {
						case 'Piano':
							piano.load();
							break;
						case 'Alto Sax':
							sax.load();
							break;
					}
				});
			}
		});
	};

	/**
	 * Define piano key class
	 */
	class Key {
		constructor(bodyID, note) {
			this.bodyID = bodyID;
			this.note = note;
			this.velocity = 127;
			this.delay = 0; 
			this.bodyEl = document.querySelector(this.bodyID);
		}
		// Method to play pressed key's note through MIDI.js player
		play() {
			//console.log('pressed');
			MIDI.noteOn(0, this.note, this.velocity, this.delay);
			this.renderOn();
		}
		// Method to stop pressed key's note through MIDI.js player
		release() {
			//console.log('released');
			MIDI.noteOff(0, this.note, this.delay);
			this.renderOff();
		}
		// Method to display that this key is being pressed
		renderOn() {
			jQuery(this.bodyID).addClass('pressed');
		}
		// Method to display that this key is no longer being pressed
		renderOff() {
			jQuery(this.bodyID).removeClass('pressed');
		}
	}

	/**
	 * Define Instrument class
	 */
	class Instrument {
		constructor(name) {
			this.name = name;
		}
		load() {
			// Let the user know the instrument is loading
			feedback.innerHTML = 'Loading...';
			// Grab this instrument object's name
			var instrumentName = this.name;
			// Load MIDI.js with soundfont associated with this 
			// instrument's name
			MIDI.loadPlugin({
				soundfontUrl: "./includes/soundfont/",
				instrument: instrumentName,
				onprogress: function(state, progress) {
					console.log(state, progress);
				},
				onsuccess: function() {
					// Change the midi program
					MIDI.programChange(0, MIDI.GM.byName[instrumentName].number);
					// Unfocus the dropdown selector
					instrumentSelector.blur();
					// Give the user some feedback
					feedback.innerHTML = 'Loaded: ' + instrumentName;
					// Clear the feedback area
					window.setTimeout(function() {
						feedback.innerHTML = '';
					}, 1000);
				}
			});		
		}
	}

})();