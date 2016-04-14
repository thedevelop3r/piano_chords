var notes =  new Array("A", "Bflat", "B", "C", "Dflat", "D", "Eflat", "E", "F", "Gflat", "G");

Note = function(pitch) {
    this.pitch = pitch;
    this.pitchString = "" + notes[pitch % 11] + "_" + Math.floor( ( (pitch + 9) / 11 ) );
}
Note.prototype = new Note();

function buildMajorTriad(root, stack) {
    stack.push(new Note(root.pitch));
    console.log(root.pitch);
    stack.push(new Note(root.pitch + 3));
    stack.push(new Note(root.pitch + 6));
}

function generateChordStack(chord) {
    var pattern = /([A-Z])([a-z]+)([0-9]+)/;
    var result = chord.match(pattern);
    console.log(result);

    var stack = new Array();
    buildMajorTriad(new Note(notes.indexOf(result[1])), stack);
    console.log(stack);
}

n = new Note(40);
console.log(n);
console.log(n.pitchString);

generateChordStack("Fm7");

var http = require("http");

var server = http.createServer(function(req, res) {
    res.writeHead(200);
    res.end(n.pitchString);
});

server.listen(8080);
