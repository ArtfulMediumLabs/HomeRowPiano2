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
			console.log('pressed');
			if(!this.active) {
				this.active = true;
				this.Player.triggerAttack();
				this.renderOn();
			}
		}
		// Method to stop pressed key's note through MIDI.js player
		release() {
			console.log('released');
			this.active = false;
			this.Player.triggerRelease();
			this.renderOff();
		}
		// Method to display that this key is being pressed
		renderOn() {
			console.log(this.bodyID);
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
	 	var Bb1 = new Key('', 'Bb', "audio/tenor-sax/1809__simondsouza__bb1.wav");
	 	var B1 = new Key('', 'B', "audio/tenor-sax/1806__simondsouza__b1.wav");
	 	var C2 = new Key('', 'C', "audio/tenor-sax/1812__simondsouza__c2.wav");
	 	var Db2 = new Key('', 'Db', "audio/tenor-sax/1818__simondsouza__db2.wav");
	 	var D2 = new Key('', 'D', "audio/tenor-sax/1815__simondsouza__d2.wav");
	 	var Eb2 = new Key('', 'Eb', "audio/tenor-sax/1824__simondsouza__eb2.wav");
	 	var E2 = new Key('', 'E', "audio/tenor-sax/1821__simondsouza__e2.wav");
	 	var F2 = new Key('', 'F', "audio/tenor-sax/1827__simondsouza__f2.wav");
	 	var Gb2 = new Key('', 'Gb', "audio/tenor-sax/1831__simondsouza__gb2.wav");
	 	var G2 = new Key('', 'G', "audio/tenor-sax/1829__simondsouza__g2.wav");
	 	var Ab2 = new Key('', 'Ab', "audio/tenor-sax/1804__simondsouza__ab2.wav");
	 	var A2 = new Key('', 'A', "audio/tenor-sax/1801__simondsouza__a2.wav");
	 	var Bb2 = new Key('', 'Bb', "audio/tenor-sax/1810__simondsouza__bb2.wav");
	 	var B2 = new Key('', 'B', "audio/tenor-sax/1807__simondsouza__b2.wav");
	 	var C3 = new Key('', 'C', "audio/tenor-sax/1813__simondsouza__c3.wav");
	 	var Db3 = new Key('', 'Db', "audio/tenor-sax/1819__simondsouza__db3.wav");
	 	var D3 = new Key('', 'D', "audio/tenor-sax/1816__simondsouza__d3.wav");
	 	var Eb3 = new Key('', 'Eb', "audio/tenor-sax/1825__simondsouza__eb3.wav");
	 	var E3 = new Key('', 'E', "audio/tenor-sax/1822__simondsouza__e3.wav");
	 	var F3 = new Key('', 'F', "audio/tenor-sax/1828__simondsouza__f3.wav");
	 	var Gb3 = new Key('', 'Gb', "audio/tenor-sax/1832__simondsouza__gb3.wav");
	 	var G3 = new Key('', 'G', "audio/tenor-sax/1830__simondsouza__g3.wav");
	 	var Ab3 = new Key('', 'Ab', "audio/tenor-sax/1805__simondsouza__ab3.wav");
	 	var A3 = new Key('', 'A', "audio/tenor-sax/1802__simondsouza__a3.wav");
	 	var Bb3 = new Key('', 'Bb', "audio/tenor-sax/1811__simondsouza__bb3.wav");
	 	var B3 = new Key('', 'B', "audio/tenor-sax/1808__simondsouza__b3.wav");
	 	var C4 = new Key('', 'C', "audio/tenor-sax/1814__simondsouza__c4.wav");
	 	var Db4 = new Key('', 'Db', "audio/tenor-sax/1817__simondsouza__d4.wav");
	 	var D4 = new Key('', 'D', "audio/tenor-sax/1816__simondsouza__d3.wav");
	 	var Eb4 = new Key('', 'Eb', "audio/tenor-sax/1826__simondsouza__eb4.wav");

	 	// Initialize an array to store Key objects
	 	var activeKeyObj = [];

	 	// Create object to assign notes to piano key elements
	 	// Kansas City Blues Scale in Bb -> Bb, C, Dd, D, Eb, F, G, Ab, A, Bb
	 	var keyAssign = {
	 		'#note1' : D2,
	 		'#note2' : Eb2,
	 		'#note3' : F2,
	 		'#note4' : G2,
	 		'#note5' : Ab2,
	 		'#note6' : A2,
	 		'#note7' : Bb2,
	 		'#note8' : C3,
	 		'#note9' : Db3,
	 		'#note10' : D3,
	 		'#note11' : Eb3,
	 		'#note12' : F3,
	 		'#note13' : G3,
	 		'#note14' : Ab3
	 	}
		
		// Set the bodyID for each piano Key in the keyAssign object
	 	for(note in keyAssign) {
	 		keyAssign[note].bodyID = note;
	 		// Push the active Key objects to the activeKeyObj array
	 		activeKeyObj.push(keyAssign[note]);
	 	}

	 	// Build new Tone.js Samplers for each Key
	 	for(var i = 0; i < activeKeyObj.length; i++) {
	 		activeKeyObj[i].build(noteLoader);
	 	}

	 	// Set volume for each note
	 	var relativeVolume = -10;
	 	for(var i = 0; i < activeKeyObj.length; i++) {
	 		activeKeyObj[i].Player.volume.value = relativeVolume;
	 	}

		// Output note name for each Key object
		var keyContainer = document.querySelector('.note-container');
		for(var i = 0; i < activeKeyObj.length; i++) {
			// Only output a note name for Keys that have assigned DOM elements
			if(activeKeyObj[i].bodyID.length) {
				var noteDiv = document.createElement('div');
				noteDiv.setAttribute('class', 'note text-center');
				noteDiv.innerHTML = '<span>' + activeKeyObj[i].note + '</span>';
				keyContainer.appendChild(noteDiv);
			}
		}

		// Listen for key presses and determine which note to play
		window.addEventListener('keydown', function(e) {
			var key = e.keyCode;
			//console.log(key);
			switch(key) {
				case 81:
					activeKeyObj[0].play();
					break;
				case 87:
					activeKeyObj[1].play();
					break;
				case 65:
					activeKeyObj[2].play();
					break;
				case 83:
					activeKeyObj[3].play();
					break;
				case 68:
					activeKeyObj[4].play();
					break;
				case 70:
					activeKeyObj[5].play();
					break;
				case 71:
					activeKeyObj[6].play();
					break;
				case 72:
					activeKeyObj[7].play();
					break;
				case 74:
					activeKeyObj[8].play();
					break;
				case 75:
					activeKeyObj[9].play();
					break;
				case 76:
					activeKeyObj[10].play();
					break;
				case 186:
					activeKeyObj[11].play();
					break;
				case 219:
					activeKeyObj[12].play();
					break;
				case 221:
					activeKeyObj[13].play();
					break;
			}
		});

		// Listen for key releases and determine which note to stop
		window.addEventListener('keyup', function(e) {
			var key = e.keyCode;
			//console.log(key);
			switch(key) {
				case 81:
					activeKeyObj[0].release();
					break;
				case 87:
					activeKeyObj[1].release();
					break;
				case 65:
					activeKeyObj[2].release();
					break;
				case 83:
					activeKeyObj[3].release();
					break;
				case 68:
					activeKeyObj[4].release();
					break;
				case 70:
					activeKeyObj[5].release();
					break;
				case 71:
					activeKeyObj[6].release();
					break;
				case 72:
					activeKeyObj[7].release();
					break;
				case 74:
					activeKeyObj[8].release();
					break;
				case 75:
					activeKeyObj[9].release();
					break;
				case 76:
					activeKeyObj[10].release();
					break;
				case 186:
					activeKeyObj[11].release();
					break;
				case 219:
					activeKeyObj[12].release();
					break;
				case 221:
					activeKeyObj[13].release();
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