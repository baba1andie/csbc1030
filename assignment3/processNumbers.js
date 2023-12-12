const fs = require('fs').promises;

async function processNumbers(inputFilePath, outputFilePath) {
  try {
    // Step 1: Read an array of numbers from a JSON file
    const inputData = await fs.readFile(inputFilePath, 'utf-8');
    const numbers = JSON.parse(inputData);

    // Step 2: Multiply numbers by two
    const multipliedNumbers = numbers.map(num => num * 2);

    // Step 3: Write the multiplied numbers to a new file
    const outputData = JSON.stringify(multipliedNumbers);
    await fs.writeFile(outputFilePath, outputData, 'utf-8');

    console.log('Processing complete. Check the output file:', outputFilePath);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Example usage:
const inputFilePath = 'samples/sample_input_numbers.json';
const outputFilePath = 'samples/output_numbers.json';

processNumbers(inputFilePath, outputFilePath);
