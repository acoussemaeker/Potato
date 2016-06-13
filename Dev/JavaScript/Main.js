function createNeurone(logger) {
	var neurone = new Neurone();

	neurone.weights = [ Math.random() < 0.5 ? -50 : 50 ];
	neurone.transfert = TransfertFunctions.getFonctionLogistique();
	neurone.observer = logger;

	return neurone;
}

function createMatrix(width, height, content) {
	var matrix = [];

	for (var i = 0; i < height; i++) {
		matrix[i] = [];
		for (var j = 0; j < width; j++) {
			matrix[i][j] = content();
		}
	}

	return matrix;
}

function displayMatrix(width, height, matrix)
{
	for (var i = 0; i < height; i++) {
		for (var j = 0; j < width; j++) {
			var address = "y"+i+"x"+j;
			
			$("#"+address).style.background = matrix[i][j] === 1 ? "black" : "white";
		}
	}
}

var logger = new LoggerObserver();

var matrixDefinition = {
	width: 10,
	height: 12
};

var matrix = createMatrix(matrixDefinition.width, matrixDefinition.height, () => createNeurone(logger));
var bitsMatrix = createMatrix(matrixDefinition.width, matrixDefinition.height, () => 0);

var dictionary = {
	A: [
		[0,0,1,0,0],
		[0,0,1,0,0],
		[0,1,0,1,0],
		[0,1,0,1,0],
		[0,1,1,1,0],
		[1,0,0,0,1],
		[1,0,0,0,1]
	],
	B: [
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0]
	], 
};