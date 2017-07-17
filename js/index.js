(function(){

	/**
	 * Definitions
	 *-----------------------------------------------------------------*/

	/**
	 * Define piano key class
	 */
	class Key {
		constructor(bodyID, note, audioFile) {
			this.bodyID = bodyID;
			this.note = note;
			this.audioFile = audioFile;
			this.bodyEl = document.querySelector(this.bodyID);
			this.active = false; // Bool to track whether key is down
		}
		build(loader) {
			loader.start(); // show loading icon
			var keyNote = this.note;
		 	this.Player = new Tone.Sampler(this.audioFile, function() {
				console.log(keyNote + ' ready');
				loader.stop(); // hide loading icon
			}).toMaster();			
		}
		// Method to play pressed key's note through MIDI.js player
		play() {
			//console.log(this.note);
			//console.log('pressed');
			if(!this.active) {
				this.active = true;
				this.Player.triggerAttack();
				this.renderOn();
			}
		}
		// Method to stop pressed key's note through MIDI.js player
		release() {
			//console.log('released');
			this.active = false;
			this.Player.triggerRelease();
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

		// Instantiate a new loader
		var noteLoader = new Loader('.loading-container');
		noteLoader.init();

	 	// Create new Key objects for each note
	 	var C2 = new Key('#c2', 'C2', "audio/tenor-sax/1812__simondsouza__c2.wav");
	 	var D2 = new Key('#d2', 'D2', "audio/tenor-sax/1815__simondsouza__d2.wav");
	 	var Eb2 = new Key('#eb2', 'Eb2', "audio/tenor-sax/1824__simondsouza__eb2.wav");
	 	var E2 = new Key('#e2', '', "audio/tenor-sax/1821__simondsouza__e2.wav");
	 	var F2 = new Key('#f2', 'F2', "audio/tenor-sax/1827__simondsouza__f2.wav");
	 	var G2 = new Key('#g2', 'G2', "audio/tenor-sax/1829__simondsouza__g2.wav");
	 	var A2 = new Key('#a2', 'A2', "audio/tenor-sax/1801__simondsouza__a2.wav");
	 	var Bb2 = new Key('#bb2', 'Bb2', "audio/tenor-sax/1810__simondsouza__bb2.wav");
	 	var B2 = new Key('#b2', 'B2', "audio/tenor-sax/1807__simondsouza__b2.wav");
	 	var C3 = new Key('#c3', 'C3', "audio/tenor-sax/1813__simondsouza__c3.wav");
	 	var D3 = new Key('#d3', 'D3', "audio/tenor-sax/1816__simondsouza__d3.wav");
	 	var Eb3 = new Key('#eb3', 'Eb3', "audio/tenor-sax/1825__simondsouza__eb3.wav");
	 	var E3 = new Key('#e3', 'E3', "audio/tenor-sax/1822__simondsouza__e3.wav");
	 	var F3 = new Key('#f3', 'F3', "audio/tenor-sax/1828__simondsouza__f3.wav");

	 	// Build new Tone.js Samplers for each Key
	 	C2.build(noteLoader);
	 	D2.build(noteLoader);
	 	Eb2.build(noteLoader);
	 	E2.build(noteLoader);
	 	F2.build(noteLoader);
	 	G2.build(noteLoader);
	 	A2.build(noteLoader);
	 	Bb2.build(noteLoader);
	 	B2.build(noteLoader);
	 	C3.build(noteLoader);
	 	D3.build(noteLoader);
	 	Eb3.build(noteLoader);
	 	E3.build(noteLoader);
	 	F3.build(noteLoader);

		// Listen for key presses and determine which note to play
		window.addEventListener('keydown', function(e) {
			var key = e.keyCode;
			//console.log(key);
			switch(key) {
				case 81:
					C2.play();
					break;
				case 87:
					D2.play();
					break;
				case 65:
					Eb2.play();
					break;
				case 83:
					E2.play();
					break;
				case 68:
					F2.play();
					break;
				case 70:
					G2.play();
					break;
				case 71:
					A2.play();
					break;
				case 72:
					Bb2.play();
					break;
				case 74:
					B2.play();
					break;
				case 75:
					C3.play();
					break;
				case 76:
					D3.play();
					break;
				case 186:
					Eb3.play();
					break;
				case 219:
					E3.play();
					break;
				case 221:
					F3.play();
					break;
			}
		});

		// Listen for key releases and determine which note to stop
		window.addEventListener('keyup', function(e) {
			var key = e.keyCode;
			//console.log(key);
			switch(key) {
				case 81:
					C2.release();
					break;
				case 87:
					D2.release();
					break;
				case 65:
					Eb2.release();
					break;
				case 83:
					E2.release();
					break;
				case 68:
					F2.release();
					break;
				case 70:
					G2.release();
					break;
				case 71:
					A2.release();
					break;
				case 72:
					Bb2.release();
					break;
				case 74:
					B2.release();
					break;
				case 75:
					C3.release();
					break;
				case 76:
					D3.release();
					break;
				case 186:
					Eb3.release();
					break;
				case 219:
					E3.release();
					break;
				case 221:
					F3.release();
					break;
			}
		});
	}

	/**
	 * Build and run the program
	 *-----------------------------------------------------------------*/

	// Get instrument selector and feedback elements
	var instrumentSelector = document.getElementById('instrument-selector');
	var feedback = document.getElementById('feedback');

	// Run the app
	main();

})();