const fs = require( "fs" );
const dataBooks = './backend/booksData.json';
// const dataAuthors = './authorsData.json';

// let books = require('./booksdata');
let books = [];

//reading
function readDataFromFile()
{
    if( fs.existsSync( dataBooks) )
    {
        fs.readFile( dataBooks, 'utf8', (err, data) =>
        {
            if( err )
            {
                console.log( err );
            }
            else
            {
                books = JSON.parse( data );
            }
        } );
    }
}
readDataFromFile();

//writing
function updateFile()
{
    let json = JSON.stringify( books );
    fs.writeFile( dataBooks, json, 'utf8', (err) =>
    {
        if( err )
        {
            throw err;
        }
    } );
}

const pug = require('pug');
const compiledFunction = pug.compileFile('./backend/template.pug');
const authors = require('./authors');
const express = require('express');
const underscore = require('underscore');
const app = express();
var cors = require('cors');
app.use(cors());
//pug stuff to use render
app.set('view engine', 'pug');
app.set("views", './backend/template.pug', "views");


app.get("/books/random", (req, res) => {
  let randomBooks = underscore.sample(books, 3);
  res.send(randomBooks);
  return res;
});

app.get("/books", (req, res) => {
  let hmmBooks = books.map((book) => {
    book

    let authorObj = authors.find((author) => {
      return author.id == book.author_id
    })

    return {
        id: book.id,
        author_id: book.author_id,
        authur: authorObj.name,
        title: book.title,
        isHardback: book.isHardback
    }
  });
  //sends the json object
  // res.send(hmmBooks)

  //will need some sort of foreach loop for this
  let htmlContent = compiledFunction(hmmBooks[0]);


  console.log(htmlContent);

  //lets send html below: 
  // res.sendFile(htmlContent); (sends a .html thingo)

  res.render(htmlContent);
  return res;
});

app.get("/books/:id", (req, res) => {
  let id = req.params.id;
  const foundBook = books.find(book => book.id == id);

  res.send(foundBook);
  return res;
});

app.post("/books/new", express.json(), (req, res) => {
  let bookInfo = req.body;

  let lastBook = books.slice(-1)[0]
  let newIndex = parseInt(lastBook.id, 10) + 1;

  let newBook = {
    id: newIndex,
    author_id: bookInfo.author_id,
    title: bookInfo.title,
    isHardback: bookInfo.isHardback
  }

  const checkBookExists = books.find(book => book.title == bookInfo.title);

  if(checkBookExists == undefined) {
    books.push(newBook); //need to write to booksData.json
    updateFile();
    res.send(newBook);
  } else {
    res.status(404).send("Can’t add duplicate book");
  }

  return res;
});

//-----------------------------

app.post("/authors/new", express.json(), (req, res) => {
  let newAuthor = req.body;
  let lastBook = books.slice(-1)[0]
  let newIndex = parseInt(lastBook.id, 10) + 1;

  authors.push({
    id: newIndex,
    name: newAuthor.name
  });

  res.send(authors);
  return res;
})

app.get("/authors", (req, res) => {
  res.send(authors);
  return res;
});

app.get("/authors/:id", (req, res) => {
  // let lastAuthor = books.slice(-1)[0]
  // let newIndex = parseInt(lastBook.id, 10) + 1;

  let id = req.params.id;
  let specificAuthor = authors[id];
  res.send(specificAuthor);
  return res;
});

const PORT = 4444;
app.listen(PORT, () => {
  console.log("Listening on port 4444");
});