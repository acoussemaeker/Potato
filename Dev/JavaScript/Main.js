var largeur = 5, hauteur = 7;

function afficherMatrice(matrice)
{
	for (var i = 0; i < hauteur; i++) {
		for (var j = 0; j < largeur; j++) {
			var address = "y"+i+"x"+j;
			
			$("#"+address).style.background = matrice[i][j] > 0.5 ? "black" : "white";
		}
	}
}

function afficherListe(liste)
{
	var matrice = creerMatrice(liste);

	afficherMatrice(matrice);
}

function vider()
{
	for (var i = 0; i < hauteur; i++) {
		for (var j = 0; j < largeur; j++) {
			var address = "y"+i+"x"+j;
			
			$("#"+address).style.background = "white";
		}
	}
}

function aplatir(matrice)
{
	var result = [];
	for (var i = 0; i < matrice.length; i++) {
		for (var j = 0; j < matrice[i].length; j++) {
			result.push(matrice[i][j]);
		}
	}

	return result;
}

function creerMatrice(liste)
{
	var index = 0;
	var result = [];

	for (var i = 0; i < hauteur; i++) {
		result[i] = [];
		for (var j = 0; j < largeur; j++) {
			result[i][j] = liste[index++];
		}
	}

	return result;
}

function reconnaitreMatrice(matrice)
{
	return creerMatrice(systeme.reseau.Evaluer(new Point(aplatir(matrice), [])))
}

var dictionary = {
	b: [
		[0,1,0,0,0],
		[0,1,0,0,0],
		[0,1,0,0,0],
		[0,1,0,0,0],
		[0,1,1,1,0],
		[0,1,0,1,0],
		[0,1,1,1,0]
	],
	C: [
		[1,1,1,1,1],
		[1,0,0,0,0],
		[1,0,0,0,0],
		[1,0,0,0,0],
		[1,0,0,0,0],
		[1,0,0,0,0],
		[1,1,1,1,1]
	],
	"0": [
		[1,1,1,1,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,0,0,0,1],
		[1,1,1,1,1]
	],
	E: [
		[1,1,1,1,1],
		[1,0,0,0,0],
		[1,0,0,0,0],
		[1,1,1,0,0],
		[1,0,0,0,0],
		[1,0,0,0,0],
		[1,1,1,1,1]
	],
	b2: [
		[0,1,0,0,0],
		[0,1,0,0,0],
		[0,1,0,0,0],
		[0,1,0,0,0],
		[0,1,1,0,0],
		[0,1,0,1,0],
		[0,1,1,0,0]
	],
	b3: [
		[0,0,0,0,0],
		[0,1,0,0,0],
		[0,1,0,0,0],
		[0,1,0,0,0],
		[0,1,1,1,0],
		[0,1,0,1,0],
		[0,1,1,0,0]
	],
};


var data = [
	new Point(aplatir(dictionary.b), aplatir(dictionary.b)),
	new Point(aplatir(dictionary.C), aplatir(dictionary.C)),
	new Point(aplatir(dictionary.E), aplatir(dictionary.E)),
	// new Point(aplatir(dictionary.b2), aplatir(dictionary.b)),
]

// var nbsNeuronesCaches = [];



// for (var i = 0; i < 100; i++) {
// 	var systeme = new SystemeNeural(35, i+1, 35, data);
// 	nbsNeuronesCaches[i] = systeme.Lancer();
// }

// console.log(nbsNeuronesCaches);

var systeme = new SystemeNeural(35, 100, 35, data);
// systeme.Lancer();