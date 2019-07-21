var connection = require('../lib/db');
const util = require('util');

const dbQuery = util.promisify(connection.query).bind(connection);

//const writeFile = util.promisify(fs.writeFile);
//const readFile = util.promisify(fs.readFile);

class UserService {
  constructor(dataFile) {
    this.dataFile = dataFile;
  }

  async addUser(newUser) {
    var existingUser = await this.getUser(newUser.email);
    if (existingUser){
      throw Error('User already exists');
    }

    const query = `insert into users(UserName, Address, Phone, Email) values ('${newUser.email}', '${newUser.city}', '', '${newUser.email}');`
    await dbQuery(query);
  }

  async getUser(email) {
    const query = `select * from users where email = '${email}'`;

    const rows = await dbQuery(query);
    const data = rows[0];
    return data;
  }

  async getAllUsers() {
    const allUsersArray = await this.getData();
    return allUsersArray.map((user) => {
      return {id: user.UserID, name: user.UserName, email: user.Email, address: user.Address};
    });
  }

  async getData() {

    const query = `select * from users`;

    const rows = await dbQuery(query);
    const data = JSON.parse(JSON.stringify(rows));
    console.log(`Fetched ${data.length} rows from DB.`);
    return data;
  }
}

module.exports = UserService;