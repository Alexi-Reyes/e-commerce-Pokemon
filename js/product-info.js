const queryString = window.location.search;
const urlSearchParams = new URLSearchParams(queryString);
const pokemonName = urlSearchParams.get('pokemon');

fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
.then((response) => response.json())
.then((pokeData) => {      
    const productDiv = document.querySelector(".pokemon-info");
    productDiv.innerHTML = `
        <h3 class="product-title">${pokeData.name}</h3>
        <div class="types-wrapper"></div>
        <img src="${pokeData.sprites.front_default}">
        <div class="abilities-wrapper"></div>
        <div class="base-stats-wrapper"></div>
    `;

    pokeData.types.forEach(element => {
        const pokemonTypes = document.createElement("p")
        pokemonTypes.textContent = element.type.name;
        pokemonTypes.className = `type-tag ${element.type.name}`;
        document.querySelector(".types-wrapper").appendChild(pokemonTypes);
    });

    pokeData.abilities.forEach(element => {
        const pokemonAbility = document.createElement("p")
        pokemonAbility.textContent = element.ability.name;
        pokemonAbility.className = `ability-tag`;
        document.querySelector(".abilities-wrapper").appendChild(pokemonAbility);
    });

    pokeData.stats.forEach(element => {
        const pokemonStats = document.createElement("p")
        pokemonStats.textContent = `${element.stat.name} : ${element.base_stat}`;
        pokemonStats.className = `stats-tag`;
        document.querySelector(".base-stats-wrapper").appendChild(pokemonStats);
    });
})
.catch((error) => document.querySelector(".pokemon-info").innerHTML = `No pokemon found`)