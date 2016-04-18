function makeChromaticConnections(progression) {
    for (int i = 0; i < progression.chords.length - 1; i++) {
	for (int j = 0; j < progression.get(i).notes.length; j++) {
	    for (int k = 0; k < progression.get(i+1).notes.length; k++) {
		// check if pitch is off by 1
		var diff = progression.get(i).get(j).pitch % 12 - progression.get(i+1).get(k).pitch % 12;
		if (diff == -1 || diff == 1) {
		    progress.get(i

}


function generateVoicing(progression) {
    
}
