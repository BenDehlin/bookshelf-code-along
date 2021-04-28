// express is the framework we use to build our server
const express = require('express')


// here we import our controllers. for now we have
// 1 controller for books but in theory we could
// import multiple controllers if we want. In this
// case we have saved the book_controller object as
// a variable called bc
const bc = require('./controllers/books_controller')


// here we define our server instance by invoking
// express. now we can use app.get(), app.post(),
// app.listen() etc to define our server endpoint
// functionality.
const app = express()

// we also define our port number as 4000
const PORT = 4000


// here we define all of our top level middleware
// we would like to use. Top level middleware will
// run on every single request that is made of
// our server. In this case we want to translate
// any incoming json to javascript so we use
// express.json() and we want to be able to serve
// up the react app provided for us in the build folder.
app.use(express.json())
app.use(express.static(__dirname + '/../build'))



// here we define our endpoints. In this example
// we have 1 get, 1 post, 1 delete, 1 put. Each of
// these endpoints will access the appropriate method
// from our book_controller file. our app.get() for
// instance is going to use the book controller's
// getBooks function
app.get('/api/books', bc.getBooks)
app.post('/api/books', bc.addBook)
// for delete and edit notice we have a :id on
// the end. this signifies we expect the user
// to put an "id" onto the end of the url. This
// will be stored in the req.params object as
// a key/value of "id".
app.delete('/api/books/:id', bc.deleteBook)
app.put('/api/books/:id', bc.editBook)


// this last part is what allows our server to 
// sit here and listen for requests.

app.listen(PORT, () => console.log(`Server is listening on ${PORT}`))