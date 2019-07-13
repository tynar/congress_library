const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

class BookService {
  constructor(dataFile) {
    this.dataFile = dataFile;
  }

  async getBookDetails(isbn) {
    const allBookData = await this.getData();
    const bookDetails = allBookData.find((book) =>{
      return book.isbn === isbn;
    });

    return bookDetails;
  }

  async getBooks() {
    const data = await this.getData();

    return data.map((book) => {
      return {isbn: book.isbn, title: book.title, thumbnailUrl: book.thumbnailUrl};
    });
  }

  async getData() {
    const data = await readFile(this.dataFile, 'utf8');
    if (!data) return [];
    return JSON.parse(data);
  }
}

module.exports = BookService;