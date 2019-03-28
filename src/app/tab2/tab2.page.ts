import {
    Component
} from '@angular/core';

@Component({
    selector: 'app-tab2',
    templateUrl: 'tab2.page.html',
    styleUrls: ['tab2.page.scss']
})

export class Tab2Page {}

var pokemonsJsonUrl = "https://graphql-pokemon.now.sh/?query=";

async function doquery() {
    
    const query = `
    {
        pokemon(name: "Pikachu") {
          name
          number
          weaknesses
        }
    }      
  `;

    const res = await fetch(pokemonsJsonUrl + query);
    const json = await res.json();

    console.log(json);
}

doquery();