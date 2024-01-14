let pokemonIndex = 0;


const filter = {
    "generation": [],
    "types": [],
};

const filteredQuery = () => {
    pokemonIndex = 0;
    document.querySelector(".products-grid").innerHTML = "";


    if (filter.generation.length == 0 && filter.types.length == 0) {
        // has no filters
        getPokemon()
    } else if (filter.generation.length == 0) {
        // has type filter
        getPokemonByType()
    } else if (filter.types.length == 0) {
        // has gen filter
        getPokemonByGen()
    } else {
        // has gen and type filters
        getPokemonByGen()

        //doesn't work
        const productElements = document.querySelectorAll('.product');

        console.log(productElements)

        filter.types.forEach(element => {
            for (const productElement of productElements) {
                if (productElement.classList.contains(element)) {
                    productElement.style.display = 'flex';
                } else {
                    productElement.style.display = 'none';
                }
            }
        })
    }
};

const resetDisplayedPokemon = () => {
    document.querySelector(".products-grid").innerHTML = "";
}

const getPokemon = () => {
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=20`) //1302
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
};

const getPokemonByGen = () => {
    filter.generation.forEach(element => {
        fetch(`https://pokeapi.co/api/v2/generation/${element}/`)
        .then((response) => response.json())
        .then((data) => {
            for (const pokemon of data.pokemon_species) {
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
    });
}


const getPokemonByType = () => {
    let retrievedPokemon = [];

    filter.types.forEach(element => {
        fetch(`https://pokeapi.co/api/v2/type/${element}/`)
        .then((response) => response.json())
        .then((data) => {
            for (const pokemon of data.pokemon) {
                fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.pokemon.name}`)
                .then((response) => response.json())
                .then((pokeData) => {
                    if (typeof pokeData.types[1] !== "undefined") {
                        if (pokeData.types[1].type.name == element || pokeData.types[0].type.name == element) {
                            retrievedPokemon.push(pokeData.name)

                            fetch(`https://pokeapi.co/api/v2/pokemon/${pokeData.name}`)
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
                    } else {
                        if (pokeData.types[0].type.name == element) {
                            retrievedPokemon.push(pokeData.name)

                            fetch(`https://pokeapi.co/api/v2/pokemon/${pokeData.name}`)
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
                        } else {
                            retrievedPokemon.splice(retrievedPokemon.indexOf(pokeData.name), 1);
                        }
                    }
                })
                .catch((error) => console.log(error));

            }
        });
    });
    console.log(retrievedPokemon)
};





document.addEventListener("DOMContentLoaded", () => {
    // accordions

    document.querySelector(".accordion-types").addEventListener("click", () => {
        document.querySelector(".accordion-types-content").classList.toggle("hidden")
    });

    document.querySelector(".accordion-gen").addEventListener("click", () => {
        document.querySelector(".accordion-gen-content").classList.toggle("hidden")
    });

    // get filters values

    document.querySelectorAll(".btn-filter-gen").forEach(element => {
        element.addEventListener("click", () => {
            if (filter.generation.includes(element.value)) {
                filter.generation.splice(filter.generation.indexOf(element.value), 1);
            } else {
                filter.generation.push(element.value)
            }
            filteredQuery()
        });
    });
    
    document.querySelectorAll(".btn-filter-types").forEach(element => {
        element.addEventListener("click", () => {
            if (filter.types.includes(element.value)) {
                filter.types.splice(filter.types.indexOf(element.value), 1);
            } else {
                filter.types.push(element.value)
            }
            filteredQuery()
        });
    });

    filteredQuery()

    // search pokemon

    document.querySelector("#searchPokemonBtn").addEventListener('click', () => {
        // doesnt work with this line for some reason
        document.addEventListener("DOMContentLoaded", () => {
            document.querySelector(".products-grid").innerHTML = "";
        })
        
        fetch(`https://pokeapi.co/api/v2/pokemon/${document.querySelector("#searchPokemon").value}`)
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
        .catch((error) => document.querySelector(".products-grid").innerHTML = `No pokemon found ${error}`)
    });
});