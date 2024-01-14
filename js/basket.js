// display basket items

let currentItem = 0


const retrieveLocalStorage = () => {
    document.addEventListener('DOMContentLoaded', () => {
        if (!localStorage.getItem('pokemonBasket')) {
            document.querySelector(".basket-grid").innerHTML = "Your basket is empty";
            document.querySelector(".basket-grid").style.paddingBlock = "10px";
        } else {
            JSON.parse(localStorage.getItem('pokemonBasket')).forEach(basket => {
                const basketItem = document.createElement("div");
                basketItem.className = `basket-item`;
                basketItem.innerHTML = `
                    <img src="${basket.imageURL}">
                    <div>
                        <div class="basket-item-info">
                            <h3 class="basket-item-name">${basket.name}</h3>
                            <div class="basket-item-info-types-wrapper"></div>
                            <div class="quantity-wrapper">
                                <label for="quantity-input">quantity :</label>
                                <input class="quantity-input" name="quantity-input" type="number" min="1" value="1">
                            </div>
                        </div>
                        <div class="basket-right">
                            <button class="remove-item-btn" value="${currentItem}">Remove item</button>
                        <div>
                    </div>
                `;
                document.querySelector(".basket-grid").appendChild(basketItem);
    
                basket.type.forEach(element => {
                    const pokemonTypes = document.createElement("p")
                    pokemonTypes.textContent = element;
                    pokemonTypes.className = `type-tag ${element}`;
                    document.querySelectorAll(".basket-item-info-types-wrapper")[currentItem].appendChild(pokemonTypes);
                });

                currentItem++
            });

            // remove individual item
            document.querySelectorAll(".remove-item-btn").forEach(element => {
                element.addEventListener("click", () => {
                    newBasket = JSON.parse(localStorage.getItem('pokemonBasket'))
                    newBasket.splice(element.value, 1);
                    localStorage.setItem('pokemonBasket', JSON.stringify(newBasket));
                    document.querySelector(".basket-counter").textContent = `${JSON.parse(localStorage.getItem('pokemonBasket')).length}`

                    
                    document.querySelector(".basket-grid").innerHTML = ""
                    currentItem = 0
                    JSON.parse(localStorage.getItem('pokemonBasket')).forEach(basket => {
                        const basketItem = document.createElement("div");
                        basketItem.className = `basket-item`;
                        basketItem.innerHTML += `
                        <img src="${basket.imageURL}">
                        <div>
                            <div class="basket-item-info">
                                <h3 class="basket-item-name">${basket.name}</h3>
                                <div class="basket-item-info-types-wrapper"></div>
                                <div class="quantity-wrapper">
                                    <label for="quantity-input">quantity :</label>
                                    <input class="quantity-input" name="quantity-input" type="number" min="1" value="1">
                                </div>
                            </div>
                            <div class="basket-right">
                                <button class="remove-item-btn" value="${currentItem}">Remove item</button>
                            <div>
                        </div>
                        `;
                        document.querySelector(".basket-grid").appendChild(basketItem);
            
                        basket.type.forEach(element => {
                            const pokemonTypes = document.createElement("p")
                            pokemonTypes.textContent = element;
                            pokemonTypes.className = `type-tag ${element}`;
                            document.querySelectorAll(".basket-item-info-types-wrapper")[currentItem].appendChild(pokemonTypes);
                        });
        
                        currentItem++
                    });
                })
            });
        }
    });
}

retrieveLocalStorage()


document.addEventListener('DOMContentLoaded', () => {
    document.querySelector(".clear-local-storage-btn").addEventListener("click", () => {
        localStorage.clear()
        document.querySelector(".basket-counter").textContent = `0`
        document.querySelector(".basket-grid").innerHTML = "Your basket is empty";
        document.querySelector(".basket-grid").style.paddingBlock = "10px";
    });
});