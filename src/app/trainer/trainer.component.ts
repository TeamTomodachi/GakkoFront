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
            const pkm1 = document.getElementById("pkmn1Img");
            const pkm2 = document.getElementById("pkmn2Img");
            const pkm3 = document.getElementById("pkmn3Img");

            pkm1.setAttribute("src", data.pkmn1.pogoImageUrl);
            pkm2.setAttribute("src", data.pkmn2.pogoImageUrl);
            pkm3.setAttribute("src", data.pkmn3.pogoImageUrl);

            document.getElementById("pkmn1Text").innerText = data.pkmn1.name;
            document.getElementById("pkmn1Text").setAttribute("alt", data.pkmn1.name);
            document.getElementById("pkmn2Text").innerText = data.pkmn2.name;
            document.getElementById("pkmn2Text").setAttribute("alt", data.pkmn2.name);
            document.getElementById("pkmn3Text").innerText = data.pkmn3.name;
            document.getElementById("pkmn3Text").setAttribute("alt", data.pkmn3.name);
        }

        async function getOnePoke(pokedexNum) {
            var pokemonsJsonUrl = "http://192.168.99.100/api-gateway/api/graphql/?query=";
            const query = `
            {
                poke1: pokemon (pokedexNumber: ${pokedexNum}) {
                  name
                }
            }              
            `;

            const res = await goRetrieve(pokemonsJsonUrl, query);
            const json = await res.json();

            return json;
        }

        async function queryAgainstPKMNDB(theThreePokes) {

            var pokemonsJsonUrl = "http://192.168.99.100/api-gateway/api/graphql/?query=";
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
            const json = await res.json();

            return json;
        }

        async function goRetrieve(url, query) {
            const queryObj = {
                query: query
            };
            const queryObjJson = JSON.stringify(queryObj);
            return await fetch(url, {
                method: 'POST',
                body: queryObjJson,
                headers: {
                    'Content-Type': 'application/json',
                },
            });  
        }

        let arrayOfPokes = ["Kadabra", "Articuno", "Rattata"];

        function ranNumber() {
            return Math.floor((Math.random() * 493) + 1);
        }

        async function getRandomPokemon() {
            return (await getOnePoke(ranNumber())).data.poke1.name;
        }

        addEventListener("load", async function () {
            doQuery(threePokeQuery, arrayOfPokes).then(fetchPKMNImage);

            // arrayOfPokes = [(await getRandomPokemon()), 
            //                 (await getRandomPokemon()), 
            //                 (await getRandomPokemon())];

            // queryAgainstPKMNDB(arrayOfPokes).then(fetchPKMNImage);
        });
    }
}

const threePokeQuery = `
                {
                    pkmn1: pokemon(name: "$id1") {
                        name
                        pokedexNumber
                        spriteImageUrl
                        pogoImageUrl
                    }
                    pkmn2: pokemon(name: "$id2") {
                        name
                        pokedexNumber
                        spriteImageUrl
                        pogoImageUrl
                    }
                    pkmn3: pokemon(name: "$id3") {
                        name
                        pokedexNumber
                        spriteImageUrl
                        pogoImageUrl
                    }
                }      
            `;

async function doQuery(query: string, variables = {}): Promise<any> {
    const response = await fetch('http://192.168.99.100/api-gateway/api/graphql/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // 'token': TOKEN,
        },
        body: JSON.stringify({ query, variables }),
    });

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    return response.json();
}