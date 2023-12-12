//processNumbers.js
const fs = require('fs').promises;

async function processNumbers(inputFilePath, outputFilePath) {
  try {
    const inputData = await fs.readFile(inputFilePath, 'utf-8');   // Read the array of numbers from the input file
    const numbers = JSON.parse(inputData);
    const multipliedNumbers = numbers.map(num => num * 2);   // Multiply each number by two
    const outputData = JSON.stringify(multipliedNumbers);    // Write the multiplied numbers to the output file
    await fs.writeFile(outputFilePath, outputData, 'utf-8');
    console.log('Processing complete. Output written to', outputFilePath);
  } catch (error) {
    console.error('Error:', error.message);
    //test
  }
}
const inputFilePath = 'samples/sample_input_numbers.json';
const outputFilePath = 'samples/sample_output_numbers.json';
processNumbers(inputFilePath, outputFilePath);
