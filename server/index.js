const express = require('express')

const bc = require('./controllers/books_controller')

const app = express()
const PORT = 4000

app.use(express.json())
app.use(express.static(__dirname + '/../build'))

app.get('/api/books', bc.getBooks)
app.post('/api/books', bc.addBook)
app.delete('/api/books/:id', bc.deleteBook)
app.put('/api/books/:id', bc.editBook)

app.listen(PORT, () => console.log(`Server is listening on ${PORT}`))