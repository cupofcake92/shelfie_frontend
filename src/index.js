const endPoint = "http://localhost:3000/api/v1/books"

document.addEventListener('DOMContentLoaded', async () => {
  // fetch and load books
  // async await in order to create elements before attaching events to them so code doesn't get stuck.
  await getBooks()

  const createBookForm = document.querySelector("#create-book-form");

  // creating event listener on submit event in browser
  createBookForm.addEventListener("submit", (e) =>
  createFormHandler(e))

  // listen for 'click' event on book container
  // const editButton = document.querySelector("#edit-button")
  const bookContainer = document.querySelector('#book-container')
  bookContainer.addEventListener('click', e => {
  // editButton.addEventListener('click', e => {
    // do not need to parseInt as already a string
    const id = e.target.dataset.id;
    const book = Book.findById(id);
    // debugger
    // console.log(book);
    document.querySelector('#update-book').innerHTML = book.renderUpdateForm();
    document.querySelector('#new-quote').innerHTML = book.renderNewQuote();
  });

  // listen for the submit event of the edit form and handle the data
  document.querySelector('#update-book').addEventListener('submit', e => updateFormHandler(e))
  document.querySelector('#new-quote').addEventListener('submit', e => newQuoteHandler(e))
  document.querySelector('#delete-button').addEventListener('click', e => deleteBook(e))

})

// Fetch is making a get request.
async function getBooks() {
  // wait until fetch is done.
  // because delete button was created by code but not until after ajax returned bookData.
  const response = await fetch(endPoint)
  const books = await response.json()
    books.data.forEach(book => {
      // render(book)
      const newBook = new Book(book.id, book.attributes);
      document.querySelector('#book-container').innerHTML += newBook.renderBookCard();
    })

  // console.log(books);

  // fetch(endPoint)
  // .then(response => response.json())
  // .then(books => {
  //   books.data.forEach(book => {
  //     // render(book)
  //     const newBook = new Book(book.id, book.attributes);
  //     document.querySelector('#book-container').innerHTML += newBook.renderBookCard();
  //
  //   })
  // })
}


// grabbing all the values of my inputs
  function createFormHandler(e){
    e.preventDefault()
    const titleInput = document.querySelector("#input-title").value
    const authorInput = document.querySelector("#input-author").value
    const summaryInput = document.querySelector("#input-summary").value
    const quoteInput1 = document.querySelector("#input-quote1").value
    const quoteInput2 = document.querySelector("#input-quote2").value
    const quoteInput3 = document.querySelector("#input-quote3").value
    const quoteInput4 = document.querySelector("#input-quote4").value
    const quoteInput5 = document.querySelector("#input-quote5").value


    postFetch(titleInput, authorInput, summaryInput, quoteInput1, quoteInput2, quoteInput3, quoteInput4, quoteInput5)

  }

  // making post request to backend

  function postFetch(title, author, summary, quote1, quote2, quote3, quote4, quote5){
    console.log(title, author, summary, quote1, quote2, quote3, quote4, quote5)
     fetch(endPoint, {
      // POST request
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        title: title,
        author: author,
        summary: summary,
        quotes_attributes: [
          {
            quote: quote1,
          },
          {
            quote: quote2
          },
          {
            quote: quote3
          },
          {
            quote: quote4
          },
          {
            quote: quote5
          }
        ]
      })
    })
    .then(response => response.json())
    .then(book => {

      console.log(book.data);
      const bookData = book.data;
      let newBook = new Book(bookData, bookData.attributes)

      document.querySelector('#book-container').innerHTML += newBook.renderBookCard();

    })
    .then(location.reload())
    // .catch(err => console.log(err))
  }

  // Grab all the info from the updated Book
  function updateFormHandler(e) {
    e.preventDefault();
    const id = e.target.dataset.id;
    const book = Book.findById(id);
    // debugger;
    const title = e.target.querySelector("#input-title").value;
    const author = e.target.querySelector("#input-author").value;
    const summary = e.target.querySelector("#input-summary").value;


    const quoteCount = e.target.querySelector("#quote_count").value;
    // goes in the loop as grabbing five.
    const newQuotes = [];
    for (let i=1; i <= quoteCount; i++) {
      // hash of data for the attributes.
      const quoteId = e.target.querySelector("#input-quote"+i).dataset.quoteid;
      const quoteValue = e.target.querySelector("#input-quote"+i).value;
      const quote = {
        id: quoteId,
        quote: quoteValue
      }
      newQuotes.push(quote)
    }
    console.log(newQuotes)

    patchBook(book, title, author, summary, newQuotes)
  }




  function patchBook(book, title, author, summary, newQuotes) {
    console.log(title, author, summary, newQuotes)
    fetch(`http://localhost:3000/api/v1/books/${book.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type' : 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        title: title,
        author: author,
        summary: summary,
        quotes_attributes: newQuotes

      })
    })
    .then(res => res.json())
    .then(updatedBook => console.log(updatedBook));

  }


  function newQuoteHandler(e) {
    e.preventDefault();

    const id = e.target.dataset.id;
    const book = Book.findById(id);

    const newQuote = e.target.querySelector("#input-quote").value;

    postQuote(book, newQuote)

  }


  function postQuote(book, newQuote) {
    console.log(newQuote)
    fetch(`http://localhost:3000/api/v1/books/${book.id}/quotes`, {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        quote: newQuote

      })
    })
    .then(res => res.json())
    .then(updatedBook => console.log(updatedBook))
    // hacky to force reload the page with new quote. sledge hammer, how would YOU DO IT?
    .then(location.reload())
    // creates an anonymous function that gets called when the .then happens.
    // need to research.
    // .then(() => {
    //   const element = document.querySelector(`book${book.id}`);
    //   element.scrollIntoView();
    //   }
    // );

  }


  async function deleteBook(e) {
    console.log('I have been clicked');
    console.log(e);
    console.log(e.srcElement.dataset.id);
    const response = await fetch(`http://localhost:3000/api/v1/books/${e.srcElement.dataset.id}`), {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
      }
    }



    // fetch(`http://localhost:3000/api/v1/books/${book.id}`), {
    //   method: 'DELETE',
    //   headers: {
    //     'Content-type': 'application/json',
    //     'Accept': 'application/json'
    //   }
    //   .then(resp => res.json())
    //   .then(book => {
    //     book.remove();
    //     console.log('removed');
    //   })
    // }
  // }
