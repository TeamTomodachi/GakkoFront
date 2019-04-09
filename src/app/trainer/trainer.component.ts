import {
    Component,
    OnInit
} from '@angular/core';

import {
    TokenServiceService
} from '../services/token-service.service';

@Component({
    selector: 'app-trainer',
    templateUrl: './trainer.component.html',
    styleUrls: ['./trainer.component.scss'],
})

export class TrainerComponent implements OnInit {

    constructor(private tokenservice: TokenServiceService) {}

    async ngOnInit() {

        const threePokeQuery = `
            query FeaturedPokemon($id1: String!, $id2: String!, $id3: String!) {
                pkmn1: pokemon(name: $id1) {
                    name
                    pokedexNumber
                    spriteImageUrl
                    pogoImageUrl
                }
                    pkmn2: pokemon(name: $id2) {
                    name
                    pokedexNumber
                    spriteImageUrl
                    pogoImageUrl
                }
                pkmn3: pokemon(name: $id3) {
                    name
                    pokedexNumber
                    spriteImageUrl
                    pogoImageUrl
                }
            }      
        `;

        const onePokeQuery = `
            query ASinglePokemon ($pkdexNum: Int!) {
                pkmn: pokemon (pokedexNumber: $pkdexNum) {
                    name
                }
            }              
        `;

        function fetchPKMNImage({data}) {
            const pkm1 = document.getElementById("pkmn1Img");
            const pkm2 = document.getElementById("pkmn2Img");
            const pkm3 = document.getElementById("pkmn3Img");

            console.log("did it get here? (fetchPKMNImage)");

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

        async function getOnePoke(pokedexNum, token) {
            // var pokemonsJsonUrl = "http://192.168.99.100/api-gateway/api/graphql/";
            // var pokemonsJsonUrl = "/api-gateway/api/graphql/";
            console.log("starting pokedexnum now...");

            const res = await doQuery(token, onePokeQuery, {pkdexNum: pokedexNum})
            // const res = await goRetrieve(pokemonsJsonUrl, query);
            // const json = await res.json();
            console.log("does it get here? before return in getOnePoke. here's the res: " + res);
            return res;
        }

        // async function queryAgainstPKMNDB(theThreePokes) {

        //     // var pokemonsJsonUrl = "http://192.168.99.100/api-gateway/api/graphql/";
        //     var pokemonsJsonUrl = "/api-gateway/api/graphql/";
        //     const query = `
        //         {
        //             pkmn1: pokemon(name: "${theThreePokes[0]}") {
        //                 name
        //                 pokedexNumber
        //                 spriteImageUrl
        //                 pogoImageUrl
        //             }
        //             pkmn2: pokemon(name: "${theThreePokes[1]}") {
        //                 name
        //                 pokedexNumber
        //                 spriteImageUrl
        //                 pogoImageUrl
        //             }
        //             pkmn3: pokemon(name: "${theThreePokes[2]}") {
        //                 name
        //                 pokedexNumber
        //                 spriteImageUrl
        //                 pogoImageUrl
        //             }
        //         }      
        //     `;

        //     const res = await goRetrieve(pokemonsJsonUrl, query);
        //     const json = await res.json();

        //     return json;
        // }

        // async function goRetrieve(url, query) {
        //     const queryObj = {
        //         query: query
        //     };
        //     const queryObjJson = JSON.stringify(queryObj);
        //     return await fetch(url, {
        //         method: 'POST',
        //         body: queryObjJson,
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //     });  
        // }

        let arrayOfPokes = {
            id1: "Kadabra",
            id2: "Articuno",
            id3: "Rattata"
        }//["Kadabra", "Articuno", "Rattata"];

        function ranNumber() {
            return Math.floor((Math.random() * 493) + 1);
        }

        async function getRandomPokemon(token: string) {
            return (await getOnePoke(ranNumber(), token)).data.pkmn.name;
        }

        addEventListener("load", async () => {
            // console.log("Flag 1 - Before Query");
            doQuery(await this.tokenservice.getToken(), threePokeQuery, arrayOfPokes).then(fetchPKMNImage);
            // console.log("Flag 2 - After Query")

            // arrayOfPokes = [(await getRandomPokemon()), 
            //                 (await getRandomPokemon()), 
            //                 (await getRandomPokemon())];

            // console.log(await getRandomPokemon(await this.tokenservice.getToken()));
            arrayOfPokes.id1 = (await getRandomPokemon(await this.tokenservice.getToken()));
            arrayOfPokes.id2 = (await getRandomPokemon(await this.tokenservice.getToken()));
            arrayOfPokes.id3 = (await getRandomPokemon(await this.tokenservice.getToken()));

            // queryAgainstPKMNDB(arrayOfPokes).then(fetchPKMNImage);
            doQuery(await this.tokenservice.getToken(), threePokeQuery, arrayOfPokes).then(fetchPKMNImage);
        });
    }
}

async function doQuery(token: string, query: string, variables = {}): Promise<any> {
    console.log("doing the query thing");
    const response = await fetch('/api-gateway/api/graphql/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            token,
        },
        body: JSON.stringify({ query, variables }),
    });
    console.log("after response grab");

    if (!response.ok) {
        throw new Error(`${response.statusText}: ${await response.text()}`);
    }

    console.log("res: " + response.statusText);
    // console.log("res in json: " + response.json());

    return response.json();
}