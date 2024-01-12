//get list of pokemon

let pokemonIndex = 0;

fetch(`https://pokeapi.co/api/v2/pokemon?limit=20`)
  .then((response) => response.json())
  .then((data) => {
    for (const pokemon of data.results) {
      fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
        .then((response) => response.json())
        .then((pokeData) => {
            let pokemonTypeArray = [];

            const productDiv = document.createElement('div');
            productDiv.className = `product`;
            pokeData.types.forEach(element => {
                productDiv.className += ` ${element.type.name}`
                pokemonTypeArray.push(element.type.name)
            });
            document.querySelector(".products-grid").appendChild(productDiv);

            document.querySelectorAll(".product")[pokemonIndex].innerHTML += `${pokeData.name}`

            const productImg = document.createElement('img');
            productImg.src = `${pokeData.sprites.front_default}`;
            document.querySelectorAll(".product")[pokemonIndex].appendChild(productImg);


            pokeData.types.forEach(element => {
                const pokemonTypes = document.createElement("p")
                pokemonTypes.textContent = element.type.name;
                pokemonTypes.className = `type-tag ${element.type.name}`;
                document.querySelectorAll(".product")[pokemonIndex].appendChild(pokemonTypes);
            });

            const productBtn = document.createElement('button');
            productBtn.textContent = "Add to basket";
            productBtn.className = "product-btn";

            console.log(pokemonTypeArray)
            const pokemonInfo = {
                "name": pokeData.name,
                "type": pokemonTypeArray,
                "imageURL": pokeData.sprites.front_default,
                "level": 10
            };



            productBtn.addEventListener('click', () => {
                if (!localStorage.getItem('pokemonBasket')) {
                    localStorage.setItem('pokemonBasket', JSON.stringify(pokemonInfo));
                } else {
                    newBasket = localStorage.getItem('pokemonBasket')
                    newBasket += JSON.stringify(pokemonInfo)
                    localStorage.setItem('pokemonBasket', newBasket);
                }
            });
            document.querySelectorAll(".product")[pokemonIndex].appendChild(productBtn);

            
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

// type filter 

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
