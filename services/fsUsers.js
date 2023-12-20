const fs = require("fs").promises;
const usersInputPath = "samples/users.json";

const readFile = async () => {
  try {
    const data = await fs.readFile(usersInputPath, "utf8");
    try {
      const usersObj = JSON.parse(data);
      return usersObj;
    } catch (parseError) {
      const output = "Error parsing users.json file... " + parseError;
      console.error(output);
      throw new Error(output);
    }
  } catch (error) {
    const output = "Error reading users.json file... " + error;
    console.error(output);
    throw new Error(output);
  }
};

const addUser = (user, users) => {
  try {
    fs.writeFile(usersInputPath, JSON.stringify(users));
  } catch (error) {
    const output = "Error when writing inside users.json file..." + error;
    console.log(output);
    throw new Error(output);
  }
};

module.exports = { readFile, addUser };
