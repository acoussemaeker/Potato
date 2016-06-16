class SystemeNeural
{
    constructor(_nbEntrees, _nbCaches, _nbSorties, _data)
    {
        this.tauxApprentissage = 0.3;
        this.erreurMax = 0.005;
        this.iterationsMax = 10001;

        this.data = _data;

        this.reseau = new Reseau(_nbEntrees, _nbCaches, _nbSorties);
    }

    Lancer()
    {
        var i = 0;
        var totalDErreur = Number.MAX_VALUE
        var ancienneErreur = Number.MAX_VALUE;

        while (i < this.iterationsMax && totalDErreur > this.erreurMax )
        {
            ancienneErreur = totalDErreur;
            totalDErreur = 0;

            // Evaluation
            for (var j = 0; j < this.data.length; j++) {
                var point = this.data[j];

                var sorties = this.reseau.Evaluer(point);

                for (var outNb = 0; outNb < sorties.length; outNb++)
                {
                    var erreur = point.Sorties[outNb] - sorties[outNb];
                    totalDErreur += (erreur * erreur);
                }

                // Calcul des nouveaux poids par rétropropagation
                this.reseau.AjusterPoids(point, this.tauxApprentissage);
            }

            // Changer le taux
            if (totalDErreur >= ancienneErreur)
            {
                this.tauxApprentissage = this.tauxApprentissage / 2.0;
            }

            // Information et incrément
            console.log("Iteration n°" + i + " - Total erreur : " + totalDErreur + " - Appr : " + this.tauxApprentissage);
            i++;
        }

        console.log("Terminé!");
        return i;
    }
}