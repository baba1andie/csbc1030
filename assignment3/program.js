const fs = require("fs").promises;

async function processNumbers(inputFilePath, outputFilePath) {
  try {
    const inputData = await fs.readFile(inputFilePath, "utf8");
    const numbers = JSON.parse(inputData);

    const processedNumbers = numbers.map((num) => num * 2);

    await fs.writeFile(outputFilePath, JSON.stringify(processedNumbers));

    console.log("Processing complete. Check the output file:", outputFilePath);
  } catch (error) {
    console.error("Error:", error.message);
  }
}

const inputFilePath = "input.json";
const outputFilePath = "output.json";

processNumbers(inputFilePath, outputFilePath);
