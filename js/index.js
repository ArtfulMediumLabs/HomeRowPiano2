(function(){

	/**
	 * Load initial soundfont with MIDI.js
	 */
	// window.onload = function () {
	// 	// Instantiate a new loader
	// 	var pianoLoader = new Loader('.loading-container');
	// 	pianoLoader.init();

	// 	// Load the default MIDI.js instrument
	// 	MIDI.loadPlugin({
	// 		soundfontUrl: "./includes/soundfont/",
	// 		instrument: "acoustic_grand_piano",
	// 		onprogress: function(state, progress) {
	// 			console.log(state, progress);
	// 		},
	// 		onsuccess: function() {

	// 			pianoLoader.stop(); // Hide loader

	// 			// Define piano keys
	// 			var c3 = new Key('#c3', 48);
	// 			var d3 = new Key('#d3', 50);
	// 			var e3 = new Key('#e3', 52);
	// 			var f3 = new Key('#f3', 53);
	// 			var g3 = new Key('#g3', 55);
	// 			var a3 = new Key('#a3', 57);
	// 			var b3 = new Key('#b3', 59);
	// 			var c4 = new Key('#c4', 60);

	// 			// Listen for key presses and determine which note to play
	// 			window.addEventListener('keydown', function(e) {
	// 				var key = e.keyCode;
	// 				//console.log(key);
	// 				switch(key) {
	// 					case 65:
	// 						c3.play();
	// 						break;
	// 					case 83:
	// 						d3.play();
	// 						break;
	// 					case 68:
	// 						e3.play();
	// 						break;
	// 					case 70:
	// 						f3.play();
	// 						break;
	// 					case 74:
	// 						g3.play();
	// 						break;
	// 					case 75:
	// 						a3.play();
	// 						break;
	// 					case 76:
	// 						b3.play();
	// 						break;
	// 					case 186:
	// 						c4.play();
	// 						break;
	// 				}
	// 			});

	// 			// Listen for key releases and determine which note to stop
	// 			window.addEventListener('keyup', function(e) {
	// 				var key = e.keyCode;
	// 				//console.log(key);
	// 				switch(key) {
	// 					case 65:
	// 						c3.release();
	// 						break;
	// 					case 83:
	// 						d3.release();
	// 						break;
	// 					case 68:
	// 						e3.release();
	// 						break;
	// 					case 70:
	// 						f3.release();
	// 						break;
	// 					case 74:
	// 						g3.release();
	// 						break;
	// 					case 75:
	// 						a3.release();
	// 						break;
	// 					case 76:
	// 						b3.release();
	// 						break;
	// 					case 186:
	// 						c4.release();
	// 						break;
	// 				}
	// 			});

	// 			// Build instuments
	// 			var piano = new Instrument('acoustic_grand_piano');
	// 			var sax = new Instrument('alto_sax');
	// 			var viola = new Instrument('viola');
	// 			var uipiano = new Instrument('electric_grand_piano');

	// 			// Listen for instrument change
	// 			instrumentSelector.addEventListener('change', function(e) {
	// 				var selectedInstrument = this.options[this.selectedIndex].text;
	// 				console.log(selectedInstrument);
	// 				switch(selectedInstrument) {
	// 					case 'Piano':
	// 						piano.load(pianoLoader);
	// 						break;
	// 					case 'Alto Sax':
	// 						sax.load(pianoLoader);
	// 						break;
	// 					case 'Viola':
	// 						viola.load(pianoLoader);
	// 						break;
	// 					case 'UIPiano':
	// 						uipiano.load(pianoLoader);
	// 						break;
	// 				}
	// 			});
	// 		}
	// 	});
	// };

	/**
	 * Definitions
	 *-----------------------------------------------------------------*/

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
			this.active = false; // Bool to track whether key is down
		}
		// Method to play pressed key's note through MIDI.js player
		play(instrument) {
			//console.log(this.note);
			//console.log('pressed');
			if(!this.active) {
				this.active = true;
				instrument.triggerAttack(this.note);
				this.renderOn();
			}
		}
		// Method to stop pressed key's note through MIDI.js player
		release(instrument) {
			//console.log('released');
			this.active = false;
			instrument.triggerRelease(this.note);
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
		load(loader) {
			//loader.start();
			// Grab this instrument object's name
			var instrumentName = this.name;
			// Load MIDI.js with soundfont associated with this 
			// instrument's name
			// MIDI.loadPlugin({
			// 	soundfontUrl: "./includes/soundfont/",
			// 	instrument: instrumentName,
			// 	onprogress: function(state, progress) {
			// 		console.log(state, progress);
			// 	},
			// 	onsuccess: function() {
			// 		// Change the midi program
			// 		MIDI.programChange(0, MIDI.GM.byName[instrumentName].number);
			// 		// Unfocus the dropdown selector
			// 		instrumentSelector.blur();
			// 		loader.stop();
			// 	}
			// });		
		}
	}

	/**
	 * Define class to manage loading icons
	 */
	class Loader {
		constructor(bodyID) {
			this.bodyID = bodyID;
			this.active = false;
		}
		init() {
			if(this.active === true) {
				jQuery(this.bodyID).addClass('active');
			} else {
				jQuery(this.bodyID).removeClass('active');
			}
		}
		start() {
			this.active = true;
			jQuery(this.bodyID).fadeIn(200);
			this.init();
		}
		stop() {
			this.active = false;
			jQuery(this.bodyID).fadeOut(200);
			this.init();
		}
	}

	/**
	 * Main
	 * -----
	 * Function to initialize and run the program
	 */
	function main() {

	 	// Create a new synth instrument with Tone.js and connect to speakers
		var synth = new Tone.PolySynth({
			"oscillator" : {
				"type" : "pwm",
				"modulationFrequency" : 0.2
			},
			"envelope" : {
				"attack" : 0.02,
				"decay" : 0.1,
				"sustain" : 0.2,
				"release" : 0.9,
			}
		}).toMaster();

		// Define piano keys
		var C3 = new Key('#c3', 'C3');
		var D3 = new Key('#d3', 'D3');
		var Eb3 = new Key('#eb3', 'Eb3');
		var E3 = new Key('#e3', 'E3');
		var F3 = new Key('#f3', 'F3');
		var G3 = new Key('#g3', 'G3');
		var A3 = new Key('#a3', 'A3');
		var Bb3 = new Key('#bb3', 'Bb3');
		var B3 = new Key('#b3', 'B3');
		var C4 = new Key('#c4', 'C4');
		var D4 = new Key('#d4', 'D4');
		var Eb4 = new Key('#eb4', 'Eb4');
		var E4 = new Key('#e4', 'E4');
		var F4 = new Key('#f4', 'F4');

		// Listen for key presses and determine which note to play
		window.addEventListener('keydown', function(e) {
			var key = e.keyCode;
			//console.log(key);
			switch(key) {
				case 81:
					C3.play(synth);
					break;
				case 87:
					D3.play(synth);
					break;
				case 65:
					Eb3.play(synth);
					break;
				case 83:
					E3.play(synth);
					break;
				case 68:
					F3.play(synth);
					break;
				case 70:
					G3.play(synth);
					break;
				case 71:
					A3.play(synth);
					break;
				case 72:
					Bb3.play(synth);
					break;
				case 74:
					B3.play(synth);
					break;
				case 75:
					C4.play(synth);
					break;
				case 76:
					D4.play(synth);
					break;
				case 186:
					Eb4.play(synth);
					break;
				case 219:
					E4.play(synth);
					break;
				case 221:
					F4.play(synth);
					break;
			}
		});

		// Listen for key releases and determine which note to stop
		window.addEventListener('keyup', function(e) {
			var key = e.keyCode;
			//console.log(key);
			switch(key) {
				case 81:
					C3.release(synth);
					break;
				case 87:
					D3.release(synth);
					break;
				case 65:
					Eb3.release(synth);
					break;
				case 83:
					E3.release(synth);
					break;
				case 68:
					F3.release(synth);
					break;
				case 70:
					G3.release(synth);
					break;
				case 71:
					A3.release(synth);
					break;
				case 72:
					Bb3.release(synth);
					break;
				case 74:
					B3.release(synth);
					break;
				case 75:
					C4.release(synth);
					break;
				case 76:
					D4.release(synth);
					break;
				case 186:
					Eb4.release(synth);
					break;
				case 219:
					E4.release(synth);
					break;
				case 221:
					F4.release(synth);
					break;
			}
		});

		//play a middle 'C' for the duration of an 8th note
		//synth.triggerAttackRelease("C4", "8n");
	}

	/**
	 * Build and run the program
	 *-----------------------------------------------------------------*/

	// Get instrument selector and feedback elements
	var instrumentSelector = document.getElementById('instrument-selector');
	var feedback = document.getElementById('feedback');

	// Instantiate a new loader
	var instrumentLoader = new Loader('.loading-container');
	instrumentLoader.init();

	// Hide the loading icon
	instrumentLoader.stop();

	// Run the app
	main();

})();