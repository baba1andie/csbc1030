const fs = require('fs').promises;

async function processNumbers(inputFilePath, outputFilePath) {
  try {    const inputData = await fs.readFile(inputFilePath, 'utf-8');
    const numbers = JSON.parse(inputData);

 
    const multipliedNumbers = numbers.map(num => num * 2);

   
    const outputData = JSON.stringify(multipliedNumbers);
    await fs.writeFile(outputFilePath, outputData, 'utf-8');

    console.log('Processing complete. Check the output file:', outputFilePath);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

const inputFilePath = 'samples/sample_input_numbers.json';
const outputFilePath = 'samples/sample_output_numbers.json';

processNumbers(inputFilePath, outputFilePath);
