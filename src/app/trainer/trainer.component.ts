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

            pkm1.setAttribute("src", data.pkmn1.pogoImageUrl);
            pkm2.setAttribute("src", data.pkmn2.pogoImageUrl);
            pkm3.setAttribute("src", data.pkmn3.pogoImageUrl);

            document.getElementById("pkmn1Text").innerText = data.pkmn1.name;
            document.getElementById("pkmn2Text").innerText = data.pkmn2.name;
            document.getElementById("pkmn3Text").innerText = data.pkmn3.name;

            // console.log(data.pkmn1.number);
        }

        async function queryAgainstPKMNDB(theThreePokes) {

            var pokemonsJsonUrl = "http://192.168.99.100/api-gateway/api/graphql/?query=";
            console.log("hello");
            const query = `
                {
                    pkmn1: pokemon(name: "${theThreePokes[0]}") {
                        name
                        pokedexNumber
                        spriteImageUrl
                        pogoImageUrl
                    }
                    pkmn2: pokemon(name: "${theThreePokes[1]}") {
                        name
                        pokedexNumber
                        spriteImageUrl
                        pogoImageUrl
                    }
                    pkmn3: pokemon(name: "${theThreePokes[2]}") {
                        name
                        pokedexNumber
                        spriteImageUrl
                        pogoImageUrl
                    }
                }      
            `;

            const res = await goRetrieve(pokemonsJsonUrl, query);
            console.log("after res");
            console.log(res);
            const json = await res.json();

            console.log("printing json: ");
            console.log(json);
            return json;
        }

        async function goRetrieve(url, query) {
            const queryObj = {
                query: query
            };
            const queryObjJson = JSON.stringify(queryObj);
            console.log("goRetrieve function entered");
            // console.log("url: " + url + query);
            return await fetch(url, {
                method: 'POST',
                body: queryObjJson,
                headers: {
                    'Content-Type': 'application/json',
                },
            });  
        }

        const arrayOfPokes = ["Kadabra", "Raichu", "Rattata"]

        addEventListener("load", async function () {
            queryAgainstPKMNDB(arrayOfPokes).then(fetchPKMNImage);
        });
    }

}