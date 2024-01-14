// search pokemon

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector("#searchPokemonBtn").addEventListener('click', () => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${document.querySelector("#searchPokemon").value}`)
        .then((response) => response.json())

        // old version 

        //.then((pokeData) => {
        //    document.querySelector(".products-grid").innerHTML = "";
//
        //                
        //    const productDiv = document.createElement('div');
        //    productDiv.className = "product";
        //    document.querySelector(".products-grid").appendChild(productDiv);
    //
        //    document.querySelector(".product").innerHTML = `${pokeData.name}`
    //
        //    const imgElement = document.createElement('img');
        //    imgElement.src = `${pokeData.sprites.front_default}`;
        //    document.querySelector(".product").appendChild(imgElement);
        //})
        .then((pokeData) => {
            // doesnt work with this line for some reason
            //document.querySelector(".products-grid").innerHTML = "";

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
        .catch((error) => document.querySelector(".products-grid").innerHTML = `No pokemon found ${error}`)
    });
});