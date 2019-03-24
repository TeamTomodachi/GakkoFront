import { Component } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

export class Tab2Page {}

// GraphQL - Tutorial Schema Portion
var { graphql, buildSchema } = require('graphql');

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

// My attempt.
var pkmList;

var oReq = new XMLHttpRequest();
oReq.onload = reqListener;
oReq.open("get", "https://raw.githubusercontent.com/lucasbento/graphql-pokemon/master/src/pokemons/pokemons.json", true);
oReq.send();

function reqListener(e) {
    pkmList = JSON.parse(this.responseText);
}

console.log(pkmList);

// var mySchema = buildSchema(`
//     type Query {
//         N025(id: ID): String
//     }
// `);

// var myQuery = '{ N025 }';

// graphql(mySchema, myQuery, pokemonList).then((response) => {
//   console.log(response);
// });