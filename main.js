const searchForm = document.querySelector('form');
const searchResultDiv = document.querySelector('.search-result');
const container = document.querySelector('.container');
let searchQuery = '';
const APP_ID = "302fcff6";
const APP_key = "2f91a6c12eaebbc44d508f1c38792cd5	";

// console.log(container)
searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    searchQuery = e.target.querySelector('input').value;
    fetchAPI();
})

async function fetchAPI() {
    const baseURL = `https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_key}&from=0&to=20`;
    const response = await fetch(baseURL);
    const data = await response.json();
    generateHTML(data.hits)
    console.log(data);
}

function generateHTML(results) {
    container.classList.remove('initial');
    let generatedHTML = '';
    results.map(result => {
        generatedHTML += `
        <div class="item">
        <img src="${result.recipe.image}" alt="">
        <div class="flex-container">
            <h1 class="title">${result.recipe.label}</h1>
            <a class="view-btn" href="${result.recipe.url}">View Book</a>
        </div>
        <p class="item-data">Author: Yuval Noah Harari</p>
        <p class="item-data">Genre: Literature & Fiction</p>
        <p class="item-data">Language: English</p>
    </div>
    `

    })
    searchResultDiv.innerHTML = generatedHTML;
}