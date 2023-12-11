const { json } = require("stream/consumers");
const { readJsonFile, writeJsonFile } = require("./readFile");

const inputFilePath = "../sample/sample_input_numbers.json";
const outputFilePath = "../sample/sample_output_numbers.json";

const jsonData = readJsonFile(inputFilePath);

if (jsonData) {
  jsonData.numbers = jsonData.numbers.map((eachNumber) => eachNumber * 2);

  jsonData.newProperty = "This is a new property";

  writeJsonFile(outputFilePath, jsonData);
  console.log("Writing to file Path", outputFilePath);
} else {
  console.log("Error reading or parsing the JSON file.");
}
