//Globar Variables
const userInput = document.getElementById('search-keyword');
const searchButton = document.getElementById('search-btn');
const resultContainer = document.getElementById('result-container');
let searchKeyword = '';
let apiURL = '';


//get search keyword from user input
userInput.addEventListener('keyup', (event) => {
    searchKeyword = event.target.value;
})

//get data from the server
const getBookData = async (apiURL) => {
    try {
        const response = await fetch(apiURL);
        const bookData = await response.json();
        displayData(bookData?.docs);
        const resultCount = document.getElementById('result-count');
        resultCount.innerText = `Showing 100 of ${bookData?.num_found} results`
        console.log(bookData);
    } catch (error) {
        console.log(`${error.message}`)
    }
}


//search button handler
searchButton.addEventListener('click', () => {
    if(searchKeyword.length === 0) {
        alert(`please type your preferred book name`)
    } else {
        apiURL = `https://openlibrary.org/search.json?q=${searchKeyword}`
    }
    getBookData(apiURL);
    userInput.value = '';
})

//display data in UI
const displayData = (docs) => {
    
    docs?.forEach(singleBook => {
        let imgURL = ``;
     if(singleBook?.cover_i) {
         imgURL = `https://covers.openlibrary.org/b/id/${singleBook?.cover_i}-M.jpg`
        }
        const card = document.createElement('div');
        card.classList.add('card');
        card.style.marginBottom = '10px'
        card.style.width = '24%';
        card.innerHTML = 
            `<img src=${imgURL} class="card-img-top" style="object-fit: cover; height: 160px; width: auto;">
            <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>`
        resultContainer.appendChild(card);
    })
}








































// const displayData = (bookData) => {
//     console.log(bookData);
//     let imageID = '';

//     bookData.docs.forEach((singleBook) => {
//         if(singleBook.cover_i) {
//             imageID = cover_i
//         }
//     })
//     let imageURL = `https://covers.openlibrary.org/b/id/${cover_i}-M.jpg`


//     const card = document.createElement('div');
//     card.classList.add('card');
//     card.style.width = '18rem';
//     card.innerHTML = 
//             `<img src="..." class="card-img-top" alt="...">
//             <div class="card-body">
//             <h5 class="card-title">Card title</h5>
//             <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
//             <a href="#" class="btn btn-primary">Go somewhere</a>
//             </div>`
//     resultContainer.appendChild(card)
// }