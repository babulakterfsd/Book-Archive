const searceField = document.getElementById('input-field')
const displayBooks = document.getElementById('display-books')
const spinner = document.getElementById('spinner')
spinner.style.display = 'none'
const foundResult = document.getElementById('found-result')
const errorMessage1 = document.getElementById('error1')
const errorMessage2 = document.getElementById('error2')

// searce books

const searceBook = () => {
    const searceText = searceField.value;
    searceField.value = '';

    if(searceText === '') {
        // error handle 1 
        errorMessage1.style.display = 'block'
        // clear display
        displayBooks.innerText = '';
        foundResult.style.display = 'none'
        errorMessage2.style.display = 'none'

    }
    else{
        // add spinner
        spinner.style.display = 'block'
        // clear display
        displayBooks.innerText = '';
        foundResult.style.display = 'none'
        errorMessage1.style.display = 'none'
        errorMessage2.style.display = 'none'

        // fetch data
        fetch(`HTTPS://openlibrary.org/search.json?q=${searceText}`)
            .then(res => res.json())
            .then(data => showBooks(data))
    }

}

const showBooks = (books) => {
    console.log(books.docs.length)
    // error handle 2
    if(books.docs.length === 0){
        errorMessage2.style.display = 'block'
        // clear display
        foundResult.style.display = 'none'
    }



    // found result 
    foundResult.style.display = 'block'
    foundResult.innerHTML = `
    <h2 class="text-center fw-bold text-info"> ${books.numFound} Items Found but Display ${books.docs.length} Items</h2> 
    `
    // spinner
    spinner.style.display = 'none'

    displayBooks.innerText = '';
    const allBooks = books.docs
    allBooks.forEach(book => {
        // console.log(book.title)
        const div = document.createElement('div');
        div.classList.add('col')
        div.innerHTML = `
        <div class="card h-100">
            <img src= "https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top w-100 h-50 mb-5" alt="...">
            <div class="card-body">
                <h3 class="card-title"><span class="text-info">Name :</span> ${book.title ? book.title : 'Not found'}</h3>
                <h5><span class="text-info">Author name :</span> ${book.author_name ? book.author_name : 'Not found' }</h5>
                <h5><span class="text-info">Publisher :</span> ${book.publisher ? book.publisher : 'Not found' }</h5>
                <h5><span class="text-info">First publish in :</span> ${book.first_publish_year ? book.first_publish_year : 'Not found' }</h5>
            </div>
        </div>
        `
        displayBooks.appendChild(div)

    });
}