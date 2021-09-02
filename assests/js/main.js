//Global variables
const searchField = document.getElementById('input-field')
const displayBooks = document.getElementById('display-books')
const spinner = document.getElementById('spinner')
spinner.style.display = 'none'
const foundResult = document.getElementById('found-result')
const errorMessage1 = document.getElementById('error1')
const errorMessage2 = document.getElementById('error2')



// fetch data from server depending on user input
const searchBook = () => {
    const searchText = searchField.value;
    searchField.value = '';

   //error handling for empty input
    if(searchText === '') { 
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
        fetch(`https://openlibrary.org/search.json?q=${searchText}`)
            .then(res => res.json())
            .then(data => showBooks(data))
    }
}


//Update and Displaying Data in the UI
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
                      <h5 class="card-title fw-bold py-1 border-bottom text-success"><span class="text-secondary">Title: </span> ${book.title ? book.title : 'Not found'}</h5>

                      <h6 class="py-1 fw-bold border-bottom text-success"><span class="text-secondary">Author Name :</span> ${book.author_name ? book.author_name[0] : 'Not found' }</h6>

                      <h6 class="py-1 fw-bold border-bottom text-success"><span class="text-secondary">Publisher : </span> ${book.publisher ? book.publisher[0] : 'Not found' }</h6>

                      <h6 class="py-1 fw-bold text-success"><span class="text-secondary">First Publish Year : </span> ${book.first_publish_year ? book.first_publish_year : 'Not found' }</h6>
                 </div>
              </div>
             `
        displayBooks.appendChild(div)
    });
}