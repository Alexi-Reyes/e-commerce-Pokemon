// display basket items

document.addEventListener('DOMContentLoaded', () => {
    if (!localStorage.getItem('pokemonBasket')) {
        document.querySelector(".basket").innerHTML = "Your basket is empty";
    } else {
        console.log(localStorage.getItem('pokemonBasket'))
        JSON.parse(localStorage.getItem('pokemonBasket')).forEach(basket => {
            const basketItem = document.createElement('div');
            basketItem.className = `basket-item`;
            document.querySelector(".basket-grid").appendChild(basketItem);

            const productTitle = document.createElement('h3');
            productTitle.textContent = basket.name;
            document.querySelector(".basket-item").appendChild(productTitle);
            
            const productImg = document.createElement('img');
            productImg.src = basket.imageURL;
            document.querySelector(".basket-item").appendChild(productImg);

            basket.type.forEach(element => {
                const pokemonTypes = document.createElement("p")
                pokemonTypes.textContent = element;
                pokemonTypes.className = `type-tag ${element}`;
                document.querySelector(".basket-item").appendChild(pokemonTypes);
            });
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector(".clear-local-storage-btn").addEventListener("click", () => {
        localStorage.clear()
    });
});