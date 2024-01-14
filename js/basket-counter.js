document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem('pokemonBasket')) {
        document.querySelector(".basket-counter").textContent = `${JSON.parse(localStorage.getItem('pokemonBasket')).length}`
    }
});