var notes =  new Array("A", "A#/Bb", "B", "B#/C", "C#/Db", "D", "D#/Eb", "E/Fb", "E#/F", "F#/Gb", "G", "G#/Ab");

Note = function(pitch) {
    this.pitch = pitch;
    this.note = pitch % 12;
    this.octave = Math.floor ( (pitch + 9) / 12 );
    this.pitchString = notes[this.note] + "_" + this.octave;
    
    this.alter = function (halfSteps) {
	this.pitch += halfSteps;
	this.note = this.pitch % 12;
	this.octave = Math.floor ( (this.pitch + 9) / 12 );
	this.pitchString = notes[this.note] + "_" + this.octave;
    }    
}
Note.prototype = new Note();

Chord = function(notes) {
    this.notes = notes;
    
    this.get = function(index) {
	return this.notes[index];
    }

    this.push = function(note) {
	this.notes.push(note);
    }

    this.splice = function(index, replace, value) {
	this.notes.splice(index, replace, value);
    }
    
    this.getChordString = function() {
	var output = new String();
	for (i = 0; i < this.notes.length; i++) {
	    output += this.notes[i].pitchString + ", ";
	}
	return output.substring(0, output.length - 2);
    }
}
Chord.prototype = new Chord();

Progression = function(notes) {
    this.chords = chords;
    
    this.get = function(index) {
	return this.chords[index];
    }
 
    this.push = function(chord) {
	this.chords.push(chord);
    }

    this.splice = function(index, replace, value) {
	this.chords.splice(index, replace, value);
    }
    
    this.getProgressionString = function() {
	var output = new String();
	for (i = 0; i < this.chords.length; i++) {
	    output += this.chords[i].chordString + "<br>";
	}
	return output;
    }
}
Progression.prototype = new Progression();

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

function buildBaseChord(type, build, chord) {
    var root = chord.get(0).pitch;

    // build triad (manages suspensions; for other
    // altered triads see alterBaseChord)
    if (build == 2) {
	chord.push(new Note(root + 2));
    }
    else if (build == 4) {
	chord.push(new Note(root + 5));
    }
    else {
	chord.push(new Note(root + 4));
    }
    chord.push(new Note(root + 7));

    // end if only to build triad
    if(type === "add") return;

    // handle 6 chords
    if (build == 6) chord.push(new Note(root + 9));
   
    // handle 7,9,11,13 chords
    else if (build == 7) { 
	chord.push(new Note(root + 10));
    }
    else if (build == 9) { 
	chord.push(new Note(root + 10));
	chord.push(new Note(root + 14));
    }
    else if (build == 11) { 
	chord.push(new Note(root + 10));
	chord.push(new Note(root + 14));
	chord.push(new Note(root + 17));
    }
    else if (build == 13) {
	chord.push(new Note(root + 10));
	chord.push(new Note(root + 14));
	chord.push(new Note(root + 17));
	chord.push(new Note(root + 21)); 	
    }	
}       

// alter a pre-built chord
function alterBaseChord(chord, type, build, changes) {
    var root = chord.get(0).pitch;
    // alter to diminished chord
    if (type  === "dim") {
	//console.log(chord.get(1));
	for(i = 1; i <= 3 && i < chord.notes.length; i++)
	    chord.get(i).alter(-1);
	console.log(chord.getChordString());
    }
    // alter to minor chord
    else if (type === "m" || type === "min" || type === "-") {
	chord.get(1).alter(-1);
    }
    // alter to augmented chord
    else if (type === "aug" || type === "+") {
	chord.get(2).alter(1);
	if(chord.get(3) !== undefined) chord.get(3).alter(1);
    }
    // alter to major chord
    else if (type === "maj" || type === "M") {
	chord.get(3).alter(1);
    }
    // alter to minor major chord
    else if (type === "mM") {
	chord.get(1).alter(-1);
	chord.get(3).alter(1);
    }
    // alter to suspended chord
    else if (type === "sus") {
	if (build === undefined || build == 2)
	    if (chord.get(1).pitch != chord.get(0).pitch + 2) 
		chord.splice(1, 0, new Note(chord.get(0).pitch + 2));
	else if (build == 4)
	    if (chord.get(1).pitch != chord.get(0).pitch + 5)
		chord.splice(1, 0, new Note(chord.get(0).pitch + 5));
    }
    // add intervals
    else if (type === "add") {
	if(build == 9) chord.push(new Note(root + 14));
	if(build == 11) chord.push(new Note(root + 17));
	if(build == 13) chord.push(new Note(root + 21));
    }
    // raise or lower 5,9,11 intervals
    if(changes !== undefined) {
	for(i = 0; i < changes.length/2; i++) {
	    if (changes[i] === "b" || changes[i] === "-") {
		if (changes[i+1] == 5) chord.get(2).alter(-1);
		if (changes[i+1] == 9) if(chord.get(4) === undefined) chord.splice(4, 0, new Note(root + 13)); else chord.get(4).alter(-1);
		if (changes[i+1] == 11) if(chord.get(5) === undefined) chord.splice(5, 0, new Note(root + 16)); else chord.get(5).alter(-1);
	    }
	    else if (changes[i] === "#" || changes[i] ==="+") {
		if (changes[i+1] == 5) chord.get(2).alter(1);
		if (changes[i+1] == 9) if(chord.get(4) === undefined) chord.splice(4, 0, new Note(root + 15)); else chord.get(4).alter(1);
		if (changes[i+1] == 11) if(chord.get(5) === undefined) chord.splice(5, 0, new Note(root + 18)); else chord.get(5).alter(1);
	    }
	}
    }
}

function generateChord(chordString) {
    // parse chord as list of aspects:
    // [chord, root, type, build, changes]
    var pattern = /([A-G#b]+)?([a-zA-Z\+\-]+)?([0-9]+)?([adb#\-\+][0-9]+)?/;
    var result = chordString.match(pattern);
    console.log(result);
    


    // alter chord as necessary
    var chord = new Chord(new Array(new Note(findNoteValue(result[1]))));
    buildBaseChord(result[2],
	           parseInt(result[3]),
		   chord
                  );
    console.log(chord.getChordString());
    alterBaseChord(chord,
		   result[2],
		   parseInt(result[3]),
		   result[4]
		  );
   
    console.log(chordString + ": " + chord.getChordString());
    return chord;
}


/*
generateChord("Dmin7-5");
generateChord("F");
generateChord("Dbmin");
generateChord("Ebaug7");
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

//for(;;) generateChord(prompt("Enter a chord: ", ""));

//chordString = "";
//generateChord(chordString);

/*
var http = require("http");
var server = http.createServer(function(req, res) {
    res.writeHead(200);
    //for (;;) generateChord(prompt("Enter Chord: ", ""));
});
server.listen(8080);*/
