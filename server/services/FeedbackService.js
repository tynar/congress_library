const fs = require('fs');
const util = require('util');

const writeFile = util.promisify(fs.writeFile);
const readFile = util.promisify(fs.readFile);

class FeedbackService {
  constructor(dataFile) {
    this.dataFile = dataFile;
  }

  async addFeedback(newFeedback) {

    const feedbacksArray = await this.getData();

    feedbacksArray.unshift({
      name: newFeedback.name,
      email: newFeedback.email,
      message: newFeedback.message
    });

    await writeFile(this.dataFile, JSON.stringify(feedbacksArray));
  }

  async getAllFeedbacks() {
    const allFeedbacksArray = await this.getData();
    return allFeedbacksArray;
  }

  async getData() {
    const data = await readFile(this.dataFile, 'utf8');
    if (!data) return [];
    return JSON.parse(data);
  }
}

module.exports = FeedbackService;