var notes =  new Array("A", "Bflat", "B", "C", "Dflat", "D", "Eflat", "E", "F", "Gflat", "G");

Note = function(pitch) {
    this.pitch = pitch;
    this.pitchString = "" + notes[pitch % 12] + "_" + Math.floor( ( (pitch + 9) / 12 ) );
}
Note.prototype = new Note();


function generateChordStack(chord) {
    var pattern = /([a-zA-Z]+)([0-9]+)/;
    var result = chord.match(pattern);
    console.log(result);
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
