const fs = require('fs');
const util = require('util');

const writeFile = util.promisify(fs.writeFile);
const readFile = util.promisify(fs.readFile);

class UserService {
  constructor(dataFile) {
    this.dataFile = dataFile;
  }

  async addUser(newUser) {

    const usersArray = await this.getData();

    usersArray.unshift({
      name: newUser.email,
      email: newUser.email,
      address: {
        city: newUser.city,
        zipcode: newUser.zip,
      },
      website: 'NewUserWithoutWeb'
    });

    await writeFile(this.dataFile, JSON.stringify(usersArray));
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