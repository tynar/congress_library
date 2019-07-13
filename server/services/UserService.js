const fs = require('fs');
const util = require('util');

const writeFile = util.promisify(fs.writeFile);

class UserService {
  constructor(dataFile) {
    this.dataFile = dataFile;
  }

  async addUser(user) {
    // const allUsers = this.getAllUsers();
    // allUsers.unshift({name, email, address});
    // return writeFile(this.dataFile, JSON.stringify(allUsers));
  }

}