// Import the library
const now = Date.now()
process.stdout.write(`time in millis: ${Date.now() - now}\n`)
const server = require('server');

const { get, post, del } = server.router;
const { render, json, header  } = server.reply;

const Book = require('./models/book');
const BookService = require('./service/bookService');
const _bookService = new BookService();

const Author = require('./models/author');
const _authorArr = [
    new Author("Paulo Coelho", "Brazil", 1947)
    ,new Author("Kahlil Gibran", "Lebanon", 1883)
];

// Launch the server to always answer "Hello world"
// server({ port: 3000 }, ctx => 'Hello world razvan');
//server({ port: 3000 }, ctx => render('index.hbs'));

// server([
//     get('/', ctx => render('index.hbs')),
//     post('/', ctx => json(ctx.data)),
//     get(ctx => status(404))
//   ]);

process.stdout.write(`time in millis: ${Date.now() - now}\n`)


const getHome = get('/', () => render('index.hbs'));
const getGallery = get('/gallery/:id', async ctx => {
  const images = await db.find({ id: ctx.params.id }).exec();
  return render('gallery.pug', { images });
});

//books
const getBooks = get('/books', () => {return _bookService.GetAllBooks()});
const getBookByTitle = get('/bookbytitle/:title', async ctx => {
    process.stdout.write(`time in millis: ${Date.now() - now}\n`)
    //const images = await db.find({ id: ctx.params.id }).exec();
    var title = ctx.params.title;
    return _bookService.GetByTitle(title)
});
const getBooksByYear = get('/booksbyyear/:year', async ctx => {
    //const images = await db.find({ id: ctx.params.id }).exec();
    var year = parseInt(ctx.params.year)
    return _bookService.GetByYear(year)
});

const addBooks = post('/books', async ctx => {
    process.stdout.write(`time in millis: ${Date.now() - now}\n`)
    //json(ctx.data)
    var result = ctx.data
    var bookToAdd = new Book(result.title, result.author, result.year)
    _bookService.AddBook(bookToAdd);
    return `Book with title '${result.title}' added !`
});

//authors
const getAuthors = get('/authors', () => {return _authorArr});

// server({ port: 3000 }, getHome, getGallery, getBooks, getAuthors, getBookByTitle, getBooksByYear);
server({security: { csrf: false }}, getHome, getGallery, getBooks, getAuthors, getBookByTitle, getBooksByYear, addBooks);