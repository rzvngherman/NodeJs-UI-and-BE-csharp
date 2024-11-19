# NodejsWebApp1


ENDPOINTS:

1) GET '/books'
-> get all books

2) POST '/books'
-> insert a book

3) GET '/book?title=...'
-> get a book by title

4) DELETE '/book'
-> delete a book by title

5) GET '/authors'
-> get all authors

6) GET '/date?year=...&month=...'
-> display both year and month from query string

<br />
PROJECT STRUCTURE:

1) MODELS: create 2 models 'Author' and 'Book' inside 'models' folder
<br /> /models/author.js
<br /> /models/book.js

3) SERVICE: create book service
<br /> /service/bookService.js

4) REQUEST_PROCESSOR: create 'book_request_processor' 
<br /> /request_processor/book_request_processor.js

3) REQUEST_PROCESSOR: create 'author_request_processor' 
<br /> /request_processor/author_request_processor.js

4) add both request_processor files to routes.js file:
<br /> const _bookReqProcess = require("./request_processor/book_request_processor");
<br /> const _authorReqProcess = require("./request_processor/author_request_processor");

5) HELPER: create helper 'response_functions'
<br /> /helpers/response_functions.js

6) add helper response_functions to routes.js file:
<br /> const _respFct = require("./helpers/response_functions");

