let books = [
  // {
  //   id: 1,
  //   title: 'Some Book',
  //   author: "Adam"
  // },
  // {
  //   id: 2,
  //   title: "Stuart's story",
  //   author: "Stuart"
  // }
]
let id = 3

module.exports = {
  getBooks: (req, res) => {
    res.status(200).send(books)
  },
  addBook: (req, res) => {
    const {title, author} = req.body
    // if(!title || !author){
    //   return res.status(500).send("please ahve a title and author")
    // }
    const newBook = {
      id,
      title,
      author,
    }
    id++
    books = [...books, newBook]
    // books.push(newBook)
    res.status(200).send(books)
  },
  deleteBook: (req, res) => {
    console.log(req.params)
    const {id} = req.params
    books = books.filter((e) => e.id !== +id)
    // const index = books.findIndex((e) => e.id === +id)
    // books.splice(index, 2)
    res.status(200).send(books)
  },
  editBook: (req, res) => {
    const {id} = req.params
    const {title, author} = req.body
    const index = books.findIndex((e) => e.id === +id)
    // if(index === -1){
    //   return res.status(500).send("Could not find that book")
    //     }
    // books.splice(index, 1, {
    //   title: title || books[index].title,
    //   author: author || books[index].author,
    //   id: +id
    // })
    books[index] = {
      title: title || books[index].title,
      author: author || books[index].author,
      id: +id
    }
    res.status(200).send(books)
  },
}