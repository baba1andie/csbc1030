const fs = require("fs");
const path = require("path");

function readJsonFile(filePath) {
  try {
    const absolutePath = path.resolve(__dirname, filePath);
    const data = fs.readFileSync(absolutePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return null;
  }
}

function writeJsonFile(filePath, data) {
  try {
    const absolutePath = path.resolve(__dirname, filePath);
    const jsonString = JSON.stringify(data, null, 2); // Indentation of 2 spaces
    fs.writeFileSync(absolutePath, jsonString, "utf-8");
  } catch (error) {
    return null;
  }
}

module.exports = { readJsonFile, writeJsonFile };
