import {
    Component,
    OnInit
} from '@angular/core';

@Component({
    selector: 'app-trainer',
    templateUrl: './trainer.component.html',
    styleUrls: ['./trainer.component.scss'],
})
export class TrainerComponent implements OnInit {

    constructor() {}

    async ngOnInit() {

        function fetchPKMNImage({data}) {
            const imageLinkP1 = "https://raw.githubusercontent.com/ZeChrales/PogoAssets/master/pokemon_icons/pokemon_icon_";
            const imageLinkP2 = "_00.png";
            const pkm1 = document.getElementById("pkmn1Img");
            const pkm2 = document.getElementById("pkmn2Img");
            const pkm3 = document.getElementById("pkmn3Img");

            pkm1.setAttribute("src", imageLinkP1 + data.pkmn1.number + imageLinkP2);
            pkm2.setAttribute("src", imageLinkP1 + data.pkmn2.number + imageLinkP2);
            pkm3.setAttribute("src", imageLinkP1 + data.pkmn3.number + imageLinkP2);

            document.getElementById("pkmn1Text").innerText = data.pkmn1.name;
            document.getElementById("pkmn2Text").innerText = data.pkmn2.name;
            document.getElementById("pkmn3Text").innerText = data.pkmn3.name;

            // console.log(data.pkmn1.number);
        }

        async function queryAgainstPKMNDB(theThreePokes) {

            var pokemonsJsonUrl = "https://graphql-pokemon.now.sh/?query=";
            const query = `
                {
                    pkmn1: pokemon(name: "${theThreePokes[0]}") {
                        name
                        number
                    }
                    pkmn2: pokemon(name: "${theThreePokes[1]}") {
                        name
                        number
                    }
                    pkmn3: pokemon(name: "${theThreePokes[2]}") {
                        name
                        number
                    }
                }      
            `;

            const res = await fetch(pokemonsJsonUrl + query);
            const json = await res.json();

            // console.log(json);
            return json;
        }

        const arrayOfPokes = ["Abra", "Zapdos", "Rattata"]

        addEventListener("load", async function () {
            queryAgainstPKMNDB(arrayOfPokes).then(fetchPKMNImage);
        });
    }

}