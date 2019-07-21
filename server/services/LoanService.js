var connection = require('../lib/db');
const util = require('util');

const dbQuery = util.promisify(connection.query).bind(connection);

class LoanService {

  async getAllLoans() {
    const allLoansArray = await this.getData();
    return allLoansArray.map((loan) => {
      return {UserName: loan.UserName, BookTitle: loan.BookTitle, IssuedDate: new Date(loan.IssuedDate).toLocaleDateString("en-US"), DueDate: new Date(loan.DueDate).toLocaleDateString("en-US"), FineAmount: loan.FineAmount};
    });
  }

  async getData() {
    const query = `select u.UserName, b.BookTitle, l.IssuedDate, l.DueDate, l.FineAmount
    from loans l
    left join books b on l.BookID = b.BookID
    left join users u on l.UserID = u.UserID`;

    const rows = await dbQuery(query);
    const data = JSON.parse(JSON.stringify(rows));
    console.log(`Fetched ${data.length} loans data from DB.`);
    return data;
  }
}

module.exports = LoanService;