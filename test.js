pokemonData = require('./pokemonApiData.json');
const fs = require('fs')

let data = JSON.stringify(pokemonData.results.map(poke => poke.name))
// console.log(pokemonData.results)

fs.writeFile('pokemonlist.json', data, (err) => {
 if (err) throw err;
});