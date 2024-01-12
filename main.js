let pokemonIndex = 0;

fetch(`https://pokeapi.co/api/v2/pokemon?limit=20`)
  .then((response) => response.json())
  .then((data) => {
    for (const pokemon of data.results) {
      fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
        .then((response) => response.json())
        .then((pokeData) => {
            console.log(pokeData)

            const productDiv = document.createElement('div');
            productDiv.className = "product";
            document.querySelector(".products-grid").appendChild(productDiv);

            console.log(pokemonIndex)
            document.querySelectorAll(".product")[pokemonIndex].innerHTML += `${pokeData.name}`

            const imgElement = document.createElement('img');
            imgElement.src = `${pokeData.sprites.front_default}`;
            document.querySelectorAll(".product")[pokemonIndex].appendChild(imgElement);
            
            pokemonIndex++;
        })
        .catch((error) => console.log(error));
    }
  });