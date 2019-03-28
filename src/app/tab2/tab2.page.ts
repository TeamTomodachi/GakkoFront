import {
    Component
} from '@angular/core';

@Component({
    selector: 'app-tab2',
    templateUrl: 'tab2.page.html',
    styleUrls: ['tab2.page.scss']
})

export class Tab2Page {}

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

function fetchPKMNImage({data}) {
    const imageLinkP1 = "https://raw.githubusercontent.com/ZeChrales/PogoAssets/master/pokemon_icons/pokemon_icon_";
    const imageLinkP2 = "_00.png";
    const pkm1 = document.getElementById("pkmn1Img");
    const pkm2 = document.getElementById("pkmn2Img");
    const pkm3 = document.getElementById("pkmn3Img");

    pkm1.setAttribute("src", imageLinkP1 + data.pkmn1.number + imageLinkP2);
    pkm2.setAttribute("src", imageLinkP1 + data.pkmn2.number + imageLinkP2);
    pkm3.setAttribute("src", imageLinkP1 + data.pkmn3.number + imageLinkP2);

    console.log(data.pkmn1.number);
}

const arrayOfPokes = ["Abra", "Zapdos", "Squirtle"]

addEventListener("load", async function(){
    queryAgainstPKMNDB(arrayOfPokes).then(fetchPKMNImage);
});