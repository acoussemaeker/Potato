
class Neurone
{
    constructor(nbEntrees)
    {
        this.nbEntrees = nbEntrees;
        this.Sortie = NaN;
        this.poids = [];

        for (var i = 0; i <= nbEntrees; i++) {
            this.poids[i] = Math.floor((Math.random() * 2) - 1);
        }
    }

    Evaluer(entrees=[])
    {
        if (isNaN(this.sortie)) 
        {
            var composee = 0.0;

            for (var i = 0; i < this.nbEntrees; i++) {
                composee += this.poids[i] * entrees[i];
            }
            composee += this.poids[this.nbEntrees];

            this.Sortie = 1.0 / (1.0 + Math.exp(-1.0 * composee));
        }

        return this.Sortie;
    }

    Vider()
    {
        this.Sortie = NaN;
    }
}
