### Instructions: 

Open index.html in the frontend folder to view as a webpage. 

Open index.js and type "npm start" to run a nodemon server. Can use postman to check all the routes are working etc. 


---

### Challenge: 

Express Challenge - Doing the Books
Code to use

Create a simple API in Express that stores an array of books and allows requests to:

    return all books
    return one book
    create a new book using a new id

The book object should contain:

    id
    author
    title
    isHardback

Challenges

    Move the books array into its own file, import it into index.js.

    Add three more books to the books array.

    Create a route that randomly selects three books from your array (research .sample from the underscore library).

    Create a new array called authors (in an authors.js file), import it into your index.js.

    Remove the author name attribute from your book objects, instead replace it with an author id (allowing an author to relate to many books).

    Add an endpoint for creating new authors.

    Add an endpoint for returning all authors.

    Add an endpoint for returning one author.

    Add a method that automatically increments the id in your books and authors data structures for each new one created.

For the following challenges, you can read through the following links for further information:

    https://expressjs.com/en/guide/routing.html
    https://expressjs.com/en/guide/writing-middleware.html
    https://expressjs.com/en/4x/api.html#express
    https://expressjs.com/en/4x/api.html#req

    Make two directories; one called backend, the other called frontend. Move all of the Express code into the backend directory. In the frontend directory add an HTML file that fetches the data from your backend (start with displaying all books). You’ll get a CORS error. Research CORS and fix the error; start by referring to https://www.npmjs.com/package/cors

    Ensure that there’s no duplicate names in our book data structure, if there’s a duplicate book trying to be added respond with a 404 status - “Can’t add duplicate book” error.

Challenge++

    Remove the in-memory data structures and replace them with .json files stored in the local directory. When you add a new book or author it should be added to the .json file so when you stop the server you won’t lose any data.

    Research how to use Express to send server rendered HTML files. You can use the Pug templating engine to write dynamic HTML (refer to https://pugjs.org/api/getting-started.html for more information).
        There should be a page that lists all books.
        You should be able to click on a link that lists a specific book.
        Style the page.


