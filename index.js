var notes =  new Array("A", "A#/Bb", "B", "B#/C", "C#/Db", "D", "D#/Eb", "E/Fb", "E#/F", "F#/Gb", "G", "G#/Ab");


Note = function(pitch) {
    this.pitch = pitch;
    this.note = pitch % 12;
    this.octave = Math.floor ( (pitch + 9) / 12 );
    this.pitchString = "" + notes[this.note] + "_" + this.octave;
}
Note.prototype = new Note();

function findNoteValue(note) {
    for(i = 0; i < notes.length; i++) {
	// find the desired pitch index (check to find
	// pitch but not +/- a half step)
	if(  notes[i].indexOf(note) > -1  &&
	    !notes[i].indexOf(note + '#') > -1  &&
	    !notes[i].indexOf(note + 'b') > -1 ) {
	    return i;
	}
    }
  return -1;
}

function buildMajorTriad(root, stack) {
    stack.push(new Note(root.pitch));
    console.log(root.pitch);
    stack.push(new Note(root.pitch + 4));
    stack.push(new Note(root.pitch + 7));
}

// alter a pre-built major triad to minor, diminished, or augmented
function alterTriad(stack, type) {
    // lower 3rd and 5th for minor triad
    if (type  === "dim") {
	stack[1] = new Note(stack[1].pitch - 1);
	stack[2] = new Note(stack[2].pitch - 1);
    }
    // lower 3rd for minor triad
    else if (type === "m" || type == "min" || type == "-") {
	stack[1] = new Note(stack[1].pitch - 1);
    }
    // raise 5th for augmented triad
    else if (type === "aug" || type === "+") {
	stack[2] = new Note(stack[2].pitch + 1);
    }
    // pass for major triad
}

function generateChordStack(chord) {
    var pattern = /([A-Z#b]+)?([a-z\+\-]+)?([0-9]+)?/;
    //pattern = /([A-Z#b])([a-z]+)([0-9]+)?/;
    var result = chord.match(pattern);
    console.log(result);

    var stack = new Array();
    console.log(typeof result[1]);
    buildMajorTriad(new Note(findNoteValue(result[1])), stack);
    alterTriad(stack, result[2]);
    console.log(stack);
}

//n = new Note(40);
//console.log(n);
//console.log(n.pitchString);

generateChordStack("F#+");

var http = require("http");

var server = http.createServer(function(req, res) {
    res.writeHead(200);
    res.end(n.pitchString);
});

server.listen(8080);
