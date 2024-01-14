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

            const productDiv = document.createElement("div");
            productDiv.className = `product ${pokeData.types[0].type.name}`;
            productDiv.innerHTML = `
                <a href="product.html?pokemon=${pokeData.name}">
                    <h3 class="product-title">${pokeData.name}</h3>
                    <img loading="lazy" src="${pokeData.sprites.front_default}">
                </a>
                <div class="types-wrapper"><div>
            `;
            document.querySelector(".products-grid").appendChild(productDiv);

            pokeData.types.forEach(element => {
                const pokemonTypes = document.createElement("p")
                pokemonTypes.textContent = element.type.name;
                pokemonTypes.className = `type-tag ${element.type.name}`;
                document.querySelectorAll(".types-wrapper")[pokemonIndex].appendChild(pokemonTypes);
                pokemonTypeArray.push(element.type.name)
            });

            const productBtn = document.createElement('button');
            productBtn.textContent = "Add to basket";
            productBtn.className = "addto-basket-btn";

            const pokemonInfo = {
                "name": pokeData.name,
                "type": pokemonTypeArray,
                "imageURL": pokeData.sprites.front_default,
                "level": 10
            };



            productBtn.addEventListener('click', () => {
                document.querySelector(".basket-counter").classList.toggle("tada")
                document.querySelector(".basket-counter").classList.toggle("change-color")
                
                if (!localStorage.getItem('pokemonBasket')) {
                    localStorage.setItem('pokemonBasket', JSON.stringify([pokemonInfo]));
                } else {
                    newBasket = JSON.parse(localStorage.getItem('pokemonBasket'))
                    newBasket.push(pokemonInfo);
                    localStorage.setItem('pokemonBasket', JSON.stringify(newBasket));
                }
                document.querySelector(".basket-counter").textContent = `${JSON.parse(localStorage.getItem('pokemonBasket')).length}`

                setTimeout(function() {
                document.querySelector(".basket-counter").classList.remove("tada")
                document.querySelector(".basket-counter").classList.remove("change-color")
                }, 500);
            });
            document.querySelectorAll(".product")[pokemonIndex].appendChild(productBtn);

            pokemonIndex++;
        })
        .catch((error) => console.log(error));
    }
});



// type filter 

//document.addEventListener('DOMContentLoaded', () => {
//    document.querySelector("#typeFilter").addEventListener('change', (event) => {
//        const productElements = document.querySelectorAll('.product');
//
//        if (event.target.value != "all") {
//            for (const productElement of productElements) {
//                if (productElement.classList.contains(event.target.value)) {
//                    productElement.style.display = 'flex';
//                } else {
//                    productElement.style.display = 'none';
//                }
//            }
//        } else {
//            for (const productElement of productElements) {
//                productElement.style.display = 'flex';
//            }
//        }
//    });
//});
//