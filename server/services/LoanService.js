const fs = require('fs');
const util = require('util');

const writeFile = util.promisify(fs.writeFile);
const readFile = util.promisify(fs.readFile);

class LoanService {
  constructor(dataFile) {
    this.dataFile = dataFile;
  }

  async getAllLoans() {
    const allLoansArray = await this.getData();
    return allLoansArray;
  }

  async getData() {
    const data = await readFile(this.dataFile, 'utf8');
    if (!data) return [];
    return JSON.parse(data);
  }
}

module.exports = LoanService;