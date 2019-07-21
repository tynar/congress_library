var connection = require('../lib/db');
const util = require('util');

const dbRead = util.promisify(connection.query).bind(connection);

class BookService {
  constructor(dataFile) {
    this.dataFile = dataFile;
  }

  async getBookDetails(id) {
    const allBookData = await this.getBooks();

    const bookDetails = allBookData.find((book) =>{
      return book.id == id;
    });

    return bookDetails;
  }

  async getBooks() {
    const booksArray = await this.getData();

    return booksArray.map((book) => {
      return {id: book.BookID, title: book.BookTitle, thumbnailUrl: book.ThumbnailUrl, author: book.AuthorName};
    });
  }

  async getData() {

    const query = `select b.BookID, b.ISBN, b.BookTitle, a.AuthorName, a.AuthorLastName, 'https://s3.amazonaws.com/AKIAJC5RLADLUMVRPFDQ.book-thumb-images/ableson2.jpg' as ThumbnailUrl
    from books b
    join authors a on b.AuthorID = a.AuthorID`;

    const rows = await dbRead(query);
    const data = JSON.parse(JSON.stringify(rows));
    console.log(`Fetched ${data.length} rows from DB.`);
    return data;
  }
}

module.exports = BookService;