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
            const res = await doQuery(token, onePokeQuery, {pkdexNum: pokedexNum})
            return res;
        }

        let arrayOfPokes = {
            id1: "Kadabra",
            id2: "Articuno",
            id3: "Rattata"
        }

        function ranNumber() {
            return Math.floor((Math.random() * 493) + 1);
        }

        async function getRandomPokemon(token: string) {
            return (await getOnePoke(ranNumber(), token)).data.pkmn.name;
        }

        addEventListener("load", async () => {
            doQuery(await this.tokenservice.getToken(), threePokeQuery, arrayOfPokes).then(fetchPKMNImage);

            arrayOfPokes.id1 = (await getRandomPokemon(await this.tokenservice.getToken()));
            arrayOfPokes.id2 = (await getRandomPokemon(await this.tokenservice.getToken()));
            arrayOfPokes.id3 = (await getRandomPokemon(await this.tokenservice.getToken()));

            doQuery(await this.tokenservice.getToken(), threePokeQuery, arrayOfPokes).then(fetchPKMNImage);
        });
    }
}

async function doQuery(token: string, query: string, variables = {}): Promise<any> {
    const response = await fetch('/api-gateway/api/graphql/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            token,
        },
        body: JSON.stringify({ query, variables }),
    });

    if (!response.ok) {
        throw new Error(`${response.statusText}: ${await response.text()}`);
    }

    return response.json();
}