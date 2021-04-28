// here we define 2 variables that our books
// controller will keep track up. The first
// is an array of books that we will retrieve
// and add/edit/delete items to/from.
// The second is going to be a running tally
// of what the next id should be for a new
// book added to our array.
let books = []
let id = 1


// module.exports is what allows us to package
// up all of our methods into an object so that
// we can import it into index.js
module.exports = {
  getBooks: (req, res) => {
    // our getBooks method simply takes the books
    // array and sends it back as a response.
    // we set our status to 200 to signify
    // that the request was successful.
    res.status(200).send(books)
  },
  addBook: (req, res) => {
    // our addBook endpoint will expect the user
    // to send back a "body" object that has
    // a title and an author on it.
    const {title, author} = req.body
    // we create a new book object that has the
    // title and author that were sent back on
    // the req.body as well as the id we are
    // tracking at the top of the file.
    const newBook = {
      id,
      title,
      author,
    }
    // after this object is created we increment
    // id so that the next book that is added
    // will have a unique id on it.
    id++
    // next we push the new book object into our
    // books array and then send the books array
    // back as the response.
    books.push(newBook)
    res.status(200).send(books)
  },
  deleteBook: (req, res) => {
    // for delete book we need to retrieve the
    // id off the end of the url.
    const {id} = req.params
    // next we want to change the books array to
    // be the same array but with the element
    // that has an id matching what was in our
    // params removed.
    books = books.filter((e) => e.id !== +id)
    // finally we send back the updated books
    // array.
    res.status(200).send(books)
  },
  editBook: (req, res) => {
    // for edit to work we need 2 things. We
    // need an id to identify which object in
    // the array we want to edit and we need
    // the new title/author that object should
    // have. We will have the user hitting this
    // endpoint pass the id to us using 
    // req.params just like we did in delete. 
    // We will use req.body to store the 
    // title/author that we will change to.
    const {id} = req.params
    const {title, author} = req.body
    // In order for us to know which item in our
    // array to edit we will use findIndex to
    // identify the index of the element where
    // the id matches the id from req.params.
    const index = books.findIndex((e) => e.id === +id)
    // after we know what index we want to change
    // we can update books[index] to edit the
    // specific item in our array. In our case
    // here we are setting the new title to be
    // whatever got passed back on req.body as the title. If there is NO title then we are
    // using || to say that instead we will use 
    // whatever is currently there as the title.
    // We do the same thing for author.
    // This allows us to pass back ONLY a title OR
    // and author and it will keep whatever is
    // already there for the other value.
    books[index] = {
      title: title || books[index].title,
      author: author || books[index].author,
      // notice how we are setting the id to be
      // whatever the id already was.
      id: books[index].id
    }
    // at the end we send the updated array back.
    res.status(200).send(books)
  },
}