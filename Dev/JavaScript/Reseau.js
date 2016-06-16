class Reseau
{
    constructor(_nbEntrees, _nbCaches, _nbSorties)
    {
        this.nbEntrees = _nbEntrees;
        this.nbCaches = _nbCaches;
        this.nbSorties = _nbSorties;

        this.neuronesCaches = [];
        for (var i = 0; i < this.nbCaches; i++)
        {
            this.neuronesCaches[i] = new Neurone(_nbEntrees);
        }

        this.neuronesSortie = [];
        for (var i = 0; i < this.nbSorties; i++)
        {
            this.neuronesSortie[i] = new Neurone(_nbCaches);
        }
    }

    Evaluer(_point)
    {
        for (var i = 0; i < this.neuronesCaches.length; i++) {
            this.neuronesCaches[i].Vider();
        }

        for (var i = 0; i < this.neuronesSortie.length; i++) {
            this.neuronesSortie[i].Vider();
        }


        var sortiesCachees = [];
        for (var i = 0; i < this.nbCaches; i++)
        {
            sortiesCachees[i] = this.neuronesCaches[i].Evaluer(_point.Entrees);
        }
        var sorties = [];
        for (var i = 0; i < this.nbSorties; i++)
        {
            sorties[i] =  this.neuronesSortie[i].Evaluer(sortiesCachees);
        }

        return sorties;
    }

    AjusterPoids(_point, _tauxApprentissage)
    {
        // Deltas pour les sorties
        var deltasSortie = [];
        for (var i = 0; i < this.nbSorties; i++)
        {
            var sortie = this.neuronesSortie[i].Sortie;
            var sortiesAttendues = _point.Sorties[i];
            deltasSortie[i] = sortie * (1 - sortie) * (sortiesAttendues - sortie);
        }

        // Deltas pour les neurones cachés
        var deltasCaches = [];
        for (var i = 0; i < this.nbCaches; i++)
        {
            var sortieCache = this.neuronesCaches[i].Sortie;
            var somme = 0.0;
            for (var j = 0; j < this.nbSorties; j++)
            {
                somme += deltasSortie[j] * this.neuronesSortie[j].poids[i];
            }
            deltasCaches[i] = sortieCache * (1 - sortieCache) * somme;
        }

        var valeur;
        // Ajustement des poids des neurones de sortie
        for (var i = 0; i < this.nbSorties; i++)
        {
            var neuroneSortie = this.neuronesSortie[i];
            for (var j = 0; j < this.nbCaches; j++)
            {
                valeur = neuroneSortie.poids[j] + _tauxApprentissage * deltasSortie[i] * this.neuronesCaches[j].Sortie;
                neuroneSortie.poids[j] = valeur;
            }
            // Et biais
            valeur = neuroneSortie.poids[this.nbCaches] + _tauxApprentissage * deltasSortie[i] * 1.0;
            neuroneSortie.poids[this.nbCaches] = valeur;
        }

        // Ajustement des poids des neurones cachés
        for (var i = 0; i < this.nbCaches; i++)
        {
            var neuroneCache = this.neuronesCaches[i];
            for (var j = 0; j < this.nbEntrees; j++)
            {
                valeur = neuroneCache.poids[j] + _tauxApprentissage * deltasCaches[i] * _point.Entrees[j];
                neuroneCache.poids[j] = valeur;
            }
            // Et biais
            valeur = neuroneCache.poids[this.nbEntrees] + _tauxApprentissage * deltasCaches[i] * 1.0;
            neuroneCache.poids[this.nbEntrees] = valeur;
        }
    }
}
