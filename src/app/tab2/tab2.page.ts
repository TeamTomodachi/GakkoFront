import {
    Component
} from '@angular/core';

@Component({
    selector: 'app-tab2',
    templateUrl: 'tab2.page.html',
    styleUrls: ['tab2.page.scss']
})

export class Tab2Page {}

// GraphQL - Tutorial Schema Portion
var {
    graphql,
    buildSchema
} = require('graphql');

// Construct a schema, using GraphQL schema language
// var schema = buildSchema(`
//   type Query {
//     hello: String
//   }
// `);

// The root provides a resolver function for each API endpoint
// var root = { hello: () => 'Hello world!' };


// Run the GraphQL query '{ hello }' and print out the response
// graphql(schema, '{ hello }', root).then((response) => {
//   console.log(response);
// });

//--------------- My attempt.
var pkmList;
var jsonUrl = "https://raw.githubusercontent.com/TeamTomodachi/GakkoFront/master/src/pokemons.json";

function loadDoc() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            pkmList = JSON.stringify(this.responseText);
       }
    };
    xhttp.open("GET", jsonUrl, true);
    xhttp.send();
}

loadDoc();

console.log("PKLIST: " + pkmList);

var mySchema = buildSchema(`
type Attack {
  name: String
  type: String
  damage: Int
}

type Pokemon {
  id: ID!
  number: String
  name: String
  weight: PokemonDimension
  height: PokemonDimension
  classification: String
  types: [String]
  resistant: [String]
  attacks: PokemonAttack
  weaknesses: [String]
  fleeRate: Float
  maxCP: Int
  evolutions: [Pokemon]
  evolutionRequirements: PokemonEvolutionRequirement
  maxHP: Int
  image: String
}

type PokemonAttack {
  fast: [Attack]
  special: [Attack]
}

type PokemonDimension {
  minimum: String
  maximum: String
}

type PokemonEvolutionRequirement {
  amount: Int
  name: String
}

type Query {
  query: Query
  pokemons(first: Int!): [Pokemon]
  pokemon(id: String, name: String): Pokemon
}
`);

var myQuery = `
{
    pokemon(name: "Pikachu") {
      id
    }
  }
`;

graphql(mySchema, myQuery, pkmList).then((response) => {
    console.log(response);
});