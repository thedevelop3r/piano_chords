
var notes =  new Array("A", "Bflat", "B", "C", "Dflat", "D", "Eflat", "E", "F", "Gflat", "G");

Note = function(pitch) {
    this.pitch = pitch;
    this.getPitchString = function() {
	return "" + notes[pitch % 12] + "_" + Math.floor( ( (pitch + 9) / 12 ) );
    }
}
Note.prototype = new Note();

n = new Note(40);
console.log(n);
console.log(n.getPitchString());

var http = require("http");

var server = http.createServer(function(req, res) {
    res.writeHead(200);
    res.end(n.getPitchString());
});

server.listen(8080);
