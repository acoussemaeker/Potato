class TransfertFunctions {
	static getFonctionDeSeuil(seuil) {
		return (input) => input < seuil ? -1 : 1;
	}

	static getFonctionLogistique()  {
		return (input) => 1.0 / (1.0 + Math.exp(-input));
	}
}