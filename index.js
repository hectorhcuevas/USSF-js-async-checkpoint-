const fetch = require('node-fetch');
const filePath = "./input.txt"
var fs = require('fs');
//var request = require('request');
var Promise = require('bluebird');

/* 
    Command line arguments

    fetch
*/
function capitalize(string) 
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// This function should retrieve the first line of the file at `filePath`
var importPokemon = (filePath) => {
    return new Promise(
      (resolve, reject) => {
        fs.readFile(`${filePath}`, 'utf8', (err, content) => {
          if (err) {
            reject(err)
          } else {
            var pokemonArray = content.split('\n');
            //console.log(firstLine);
            resolve(pokemonArray)
      }
    });
  })
}

var pokemonPromise = importPokemon(filePath)
    .then(function(pokemonArray){
        pokemonArray.forEach(pokemon => {
            fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
                .then(function(response){
                    return response.json();
                })
                .then(function(json) {
                    let typeArray = [];
                    let typeString = "";
                    json.types.forEach(object => typeArray.push(" " + object.type.name))
                    console.log(capitalize(json.name) + ':' + typeArray.toString());
                    //console.log('json', json);
                })  
                .catch(function(error) {
                    console.error(error)
                }) 
            })
    })

    