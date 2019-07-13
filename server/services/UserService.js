const fs = require('fs');
const util = require('util');

const writeFile = util.promisify(fs.writeFile);
const readFile = util.promisify(fs.readFile);

class UserService {
  constructor(dataFile) {
    this.dataFile = dataFile;
  }

  async addUser(user) {
    // const allUsers = this.getAllUsers();
    // allUsers.unshift({name, email, address});
    // return writeFile(this.dataFile, JSON.stringify(allUsers));
  }

  async getAllUsers() {
    const allUsersArray = await this.getData();
    return allUsersArray;
  }

  async getData() {
    const data = await readFile(this.dataFile, 'utf8');
    if (!data) return [];
    return JSON.parse(data);
  }
}

module.exports = UserService;