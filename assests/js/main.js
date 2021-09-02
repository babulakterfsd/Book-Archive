//Global variables
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

   //error handling for empty input
    if(searceText === '') { 
        errorMessage1.style.display = 'block'
        displayBooks.innerText = '';
        foundResult.style.display = 'none'
        errorMessage2.style.display = 'none'
    } else {
        // add spinner
        spinner.style.display = 'block'
        displayBooks.innerText = '';
        foundResult.style.display = 'none'
        errorMessage1.style.display = 'none'
        errorMessage2.style.display = 'none'

        // fetch data
        fetch(`https://openlibrary.org/search.json?q=${searceText}`)
            .then(res => res.json())
            .then(data => showBooks(data))
    }
}

const showBooks = (books) => {
    // found result 
    foundResult.style.display = 'none'
    foundResult.innerHTML = `
    <h4 class="text-center fw-bold text-secondary"> showing ${books.docs.length} of ${books.numFound} found results</h4> 
    `
    // error handling for unexpected input
    if(books.docs.length === 0){
        errorMessage2.style.display = 'block'
    }else if(books.docs.length > 0){
        foundResult.style.display = 'block'
        errorMessage2.style.display = 'none'
    }
    
    // spinner
    spinner.style.display = 'none'

    displayBooks.innerText = '';
    const allBooks = books.docs
    allBooks.forEach(book => {
        const div = document.createElement('div');
        div.classList.add('col')
        div.innerHTML = `
                 <div class="card h-100">
                   <img src= "https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top w-100 mb-2" style="height: 250px; object-fit: cover;">
                  <div class="card-body">
                      <h5 class="card-title py-1 border-bottom text-success"><span class="text-secondary">Title: </span> ${book.title ? book.title : 'Not found'}</h5>
                      <h6 class="py-1 border-bottom text-secondary"><span class="text-success">Author Name :</span> ${book.author_name ? book.author_name[0] : 'Not found' }</h6>
                      <h6 class="py-1 border-bottom text-secondary"><span class="text-success">Publisher : </span> ${book.publisher ? book.publisher[0] : 'Not found' }</h5>
                      <h6 class="py-1 text-secondary"><span class="text-success">First Publish Year : </span> ${book.first_publish_year ? book.first_publish_year : 'Not found' }</h6>
                 </div>
              </div>
             `
        displayBooks.appendChild(div)
    });
}