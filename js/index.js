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
			if(bodyID) {
				this.bodyEl = document.querySelector(this.bodyID);
			}
			this.active = false; // Bool to track whether key is down
		}
		init(keyArray) {
			if(keyArray) {
				// Add this Key object to keys array
				keyArray.push(this);
			}
		}
		build(loader) {
			loader.start(); // show loading icon
			var keyNote = this.note;
		 	this.Player = new Tone.Sampler(this.audioFile, function() {
				//console.log(keyNote + ' ready');
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
	 * Returns focus to document body. Used to prevent Youtube iFrame from 
	 * stealing focus from playable keys.
	 */
	function checkFocus() {
	    if(document.activeElement.tagName == "IFRAME") {
	        document.getElementById("btn").focus();
	        document.body.focus();
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
	 	var Bb1 = new Key('#note1', 'Bb', "audio/tenor-sax/1809__simondsouza__bb1.wav");
	 	var B1 = new Key('', 'B', "audio/tenor-sax/1806__simondsouza__b1.wav");
	 	var C2 = new Key('#note2', 'C', "audio/tenor-sax/1812__simondsouza__c2.wav");
	 	var Db2 = new Key('#note3', 'Db', "audio/tenor-sax/1818__simondsouza__db2.wav");
	 	var D2 = new Key('#note4', 'D', "audio/tenor-sax/1815__simondsouza__d2.wav");
	 	var Eb2 = new Key('#note5', 'Eb', "audio/tenor-sax/1824__simondsouza__eb2.wav");
	 	var E2 = new Key('', 'E', "audio/tenor-sax/1821__simondsouza__e2.wav");
	 	var F2 = new Key('#note6', 'F', "audio/tenor-sax/1827__simondsouza__f2.wav");
	 	var Gb2 = new Key('', 'Gb', "audio/tenor-sax/1831__simondsouza__gb2.wav");
	 	var G2 = new Key('#note7', 'G', "audio/tenor-sax/1829__simondsouza__g2.wav");
	 	var Ab2 = new Key('#note8', 'Ab', "audio/tenor-sax/1804__simondsouza__ab2.wav");
	 	var A2 = new Key('#note9', 'A', "audio/tenor-sax/1801__simondsouza__a2.wav");
	 	var Bb2 = new Key('#note10', 'Bb', "audio/tenor-sax/1810__simondsouza__bb2.wav");
	 	var B2 = new Key('', 'B', "audio/tenor-sax/1807__simondsouza__b2.wav");
	 	var C3 = new Key('#note11', 'C', "audio/tenor-sax/1813__simondsouza__c3.wav");
	 	var Db3 = new Key('#note12', 'Db', "audio/tenor-sax/1819__simondsouza__db3.wav");
	 	var D3 = new Key('#note13', 'D', "audio/tenor-sax/1816__simondsouza__d3.wav");
	 	var Eb3 = new Key('#note14', 'Eb', "audio/tenor-sax/1825__simondsouza__eb3.wav");
	 	var E3 = new Key('', 'E', "audio/tenor-sax/1822__simondsouza__e3.wav");
	 	var F3 = new Key('', 'F', "audio/tenor-sax/1828__simondsouza__f3.wav");

	 	// Initialize an array to store Key objects
	 	var keyObjects = [];

	 	// Push each Key Object into the array
	 	Bb1.init(keyObjects);
	 	C2.init(keyObjects);
	 	Db2.init(keyObjects);
	 	D2.init(keyObjects);
	 	Eb2.init(keyObjects);
	 	E2.init(keyObjects);
	 	F2.init(keyObjects);
	 	Gb2.init(keyObjects);
	 	G2.init(keyObjects);
	 	Ab2.init(keyObjects);
	 	A2.init(keyObjects);
	 	Bb2.init(keyObjects);
	 	B2.init(keyObjects);
	 	C3.init(keyObjects);
	 	Db3.init(keyObjects);
	 	D3.init(keyObjects);
	 	Eb3.init(keyObjects);
	 	E3.init(keyObjects);
	 	F3.init(keyObjects);

	 	// Build new Tone.js Samplers for each Key
	 	for(var i = 0; i < keyObjects.length; i++) {
	 		keyObjects[i].build(noteLoader);
	 	}

	 	// Set volume for each note
	 	var relativeVolume = -10;
	 	for(var i = 0; i < keyObjects.length; i++) {
	 		keyObjects[i].Player.volume.value = relativeVolume;
	 	}

		// Output note name for each Key object
		var keyContainer = document.querySelector('.note-container');
		for(var i = 0; i < keyObjects.length; i++) {
			// Only output a note name for Keys that have assigned DOM elements
			if(keyObjects[i].bodyID.length) {
				var noteDiv = document.createElement('div');
				noteDiv.setAttribute('class', 'note text-center');
				noteDiv.innerHTML = '<span>' + keyObjects[i].note + '</span>';
				keyContainer.appendChild(noteDiv);
			}
		}

		// Listen for key presses and determine which note to play
		window.addEventListener('keydown', function(e) {
			var key = e.keyCode;
			//console.log(key);
			switch(key) {
				case 81:
					Bb1.play();
					break;
				case 87:
					C2.play();
					break;
				case 65:
					Db2.play();
					break;
				case 83:
					D2.play();
					break;
				case 68:
					Eb2.play();
					break;
				case 70:
					F2.play();
					break;
				case 71:
					G2.play();
					break;
				case 72:
					Ab2.play();
					break;
				case 74:
					A2.play();
					break;
				case 75:
					Bb2.play();
					break;
				case 76:
					C3.play();
					break;
				case 186:
					Db3.play();
					break;
				case 219:
					D3.play();
					break;
				case 221:
					Eb3.play();
					break;
			}
		});

		// Listen for key releases and determine which note to stop
		window.addEventListener('keyup', function(e) {
			var key = e.keyCode;
			//console.log(key);
			switch(key) {
				case 81:
					Bb1.release();
					break;
				case 87:
					C2.release();
					break;
				case 65:
					Db2.release();
					break;
				case 83:
					D2.release();
					break;
				case 68:
					Eb2.release();
					break;
				case 70:
					F2.release();
					break;
				case 71:
					G2.release();
					break;
				case 72:
					Ab2.release();
					break;
				case 74:
					A2.release();
					break;
				case 75:
					Bb2.release();
					break;
				case 76:
					C3.release();
					break;
				case 186:
					Db3.release();
					break;
				case 219:
					D3.release();
					break;
				case 221:
					Eb3.release();
					break;
			}
		});

		// Prevent Youtube iFrame from stealing focus from playable Keys
		window.setInterval(checkFocus, 1000); 
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