//get list of pokemon

let pokemonIndex = 0;

fetch(`https://pokeapi.co/api/v2/pokemon?limit=20`)
  .then((response) => response.json())
  .then((data) => {
    for (const pokemon of data.results) {
      fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
        .then((response) => response.json())
        .then((pokeData) => {
            const productDiv = document.createElement('div');
            productDiv.className = `product`;
            pokeData.types.forEach(element => {
                productDiv.className += ` ${element.type.name}`
            });
            document.querySelector(".products-grid").appendChild(productDiv);

            document.querySelectorAll(".product")[pokemonIndex].innerHTML += `${pokeData.name}`

            const imgElement = document.createElement('img');
            imgElement.src = `${pokeData.sprites.front_default}`;
            document.querySelectorAll(".product")[pokemonIndex].appendChild(imgElement);
            
            pokemonIndex++;
        })
        .catch((error) => console.log(error));
    }
});

// search pokemon

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector("#searchPokemon").addEventListener('change', (event) => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${event.target.value}`)
        .then((response) => response.json())
        .then((pokeData) => {
            document.querySelector(".products-grid").innerHTML = "";

                        
            const productDiv = document.createElement('div');
            productDiv.className = "product";
            document.querySelector(".products-grid").appendChild(productDiv);
    
            document.querySelector(".product").innerHTML = `${pokeData.name}`
    
            const imgElement = document.createElement('img');
            imgElement.src = `${pokeData.sprites.front_default}`;
            document.querySelector(".product").appendChild(imgElement);
        })
        .catch((error) => document.querySelector(".products-grid").innerHTML = `No pokemon found`)
    });
});

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector("#typeFilter").addEventListener('change', (event) => {
        const productElements = document.querySelectorAll('.product');

        if (event.target.value != "all") {
            for (const productElement of productElements) {
                if (productElement.classList.contains(event.target.value)) {
                    productElement.style.display = 'flex';
                } else {
                    productElement.style.display = 'none';
                }
            }
        } else {
            for (const productElement of productElements) {
                productElement.style.display = 'flex';
            }
        }
    });
});
