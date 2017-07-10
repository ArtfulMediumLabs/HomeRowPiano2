(function(){

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
				// var delay = 0; // play one note every quarter second
				// var note = 50; // the MIDI note
				// var velocity = 127; // how hard the note hits
				// // play the note
				// MIDI.setVolume(0, 127);
				// MIDI.noteOn(0, note, velocity, delay);
				// MIDI.noteOff(0, note, delay + 0.75);

				// Define piano keys
				var c3 = new Key('#c3', 50);
				var d3 = new Key('#d3', 52);
				var e3 = new Key('#e3', 54);
				var f3 = new Key('#f3', 55);
				var g3 = new Key('#g3', 57);
				var a3 = new Key('#a3', 59);
				var b3 = new Key('#b3', 61);
				var c4 = new Key('#c4', 62);

				// Initialize piano keys
				c3.init();
				d3.init();
				e3.init();
				f3.init();
				g3.init();
				a3.init();
				b3.init();
				c4.init();

				// Listen for key presses and determine which note to play
				window.addEventListener('keypress', function(e) {
					var key = e.keyCode;
					console.log(key);
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
					console.log(key);
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
		}
		init() {
			this.bodyEl = document.querySelector(this.bodyID);
			//console.log(this.bodyEl);
			//document.addEventListener('keypress', this.play(event), true);
		}
		play() {
			console.log('pressed');
			MIDI.noteOn(0, this.note, this.velocity, this.delay);
		}
		release() {
			console.log('released');
			MIDI.noteOff(0, this.note, this.delay);
		}
	}

})();