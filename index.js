var notes =  new Array("A", "A#/Bb", "B", "B#/C", "C#/Db", "D", "D#/Eb", "E/Fb", "E#/F", "F#/Gb", "G", "G#/Ab");


Note = function(pitch) {
    this.pitch = pitch;
    this.note = pitch % 12;
    this.octave = Math.floor ( (pitch + 9) / 12 );
    this.pitchString = notes[this.note] + "_" + this.octave;

    this.alter = function (halfSteps) {
	this.pitch += halfSteps;
	this.note = this.pitch % 12;
	this.octave = Math.floor ( (pitch + 9) / 12 );
	this.pitchString = notes[this.note] + "_" + this.octave;
    }    
}
Note.prototype = new Note();

function printChord(stack) {
    var output = new String();
    for (i = 0; i < stack.length; i++) {
	output += stack[i].pitchString + "\b\b, ";
    }
    console.log(output + "\b\b  ");
}

function findNoteValue(note) {
    for(i = 0; i < notes.length; i++) {
	// find the desired pitch index (check to find
	// pitch but not +/- a half step)
	if(  notes[i].indexOf(note) > -1  &&
	    !(notes[i].indexOf(note + '#') > -1)  &&
	    !(notes[i].indexOf(note + 'b') > -1 )) {
	    return i;
	}
    }
  return -1;
}

function buildBaseChord(root, type, chord) {

    // build triad
    chord.push(new Note(root.pitch));
    chord.push(new Note(root.pitch + 4));
    chord.push(new Note(root.pitch + 7));

    // handle 6 chords
    if (type == 6) chord.push(new Note(root.pitch + 9));
   
    // handle 7,9,11,13 chords
    else if (type == 7) { 
	chord.push(new Note(root.pitch + 10));
    }
    else if (type == 9) { 
	chord.push(new Note(root.pitch + 10));
	chord.push(new Note(root.pitch + 14));
    }
    else if (type == 11) { 
	chord.push(new Note(root.pitch + 10));
	chord.push(new Note(root.pitch + 14));
	chord.push(new Note(root.pitch + 17));
    }
    else if (type == 13) {
	chord.push(new Note(root.pitch + 10));
	chord.push(new Note(root.pitch + 14));
	chord.push(new Note(root.pitch + 17));
	chord.push(new Note(root.pitch + 21)); 	
    }	
}       

// alter a pre-built chord chord
function alterBaseChord(chord, type) {
    // alter to diminished chord
    if (type  === "dim") {
	for(i = 1; i <= 3; i++)
	    chord[i].alter(-1);
    }
    // alter to minor chord
    else if (type === "m" || type == "min" || type == "-") {
	chord[1] = new Note(chord[1].pitch - 1);
    }
    // alter to augmented chord
    else if (type === "aug" || type === "+") {
	chord[2] = new Note(chord[2].pitch + 1);
	chord[3] = new Note(chord[3].pitch + 1);
    }
    // alter to major chord
    else if (type == "maj" || type == "M") {
	chord[3] = new Note(chord[3].pitch + 1);
    }
}

function generateChord(chordString) {
    // parse chord as list of aspects:
    // [chord, root, alterations, build]
    var pattern = /([ABCDEFG#b]+)?([a-zA-Z\+\-]+)?([0-9]+)?/;
    var result = chordString.match(pattern);
    //console.log(result);

    // alter chord
    var chord = new Array();
    buildBaseChord(
	new Note(findNoteValue(result[1])),
	parseInt(result[3]),
	chord);
    alterBaseChord(chord, result[2]);
    console.log(chordString + ": ");
    printChord(chord);
}


generateChord("F");
/*
generateChord("C7");
generateChord("Cdim7");
generateChord("CM7");
generateChord("Cmaj7");
generateChord("Cm7");
generateChord("Cmin7");
generateChord("Caug7");
generateChord("C+7");
generateChord("C6");
generateChord("Cmin6");
*/

// webpage
// ----------------------------

var http = require("http");
var server = http.createServer(function(req, res) {
    res.writeHead(200);
    res.end(n.pitchString);
});

server.listen(8080);
