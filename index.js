const fs = require('fs').promises;

async function transformNumbers(numbersInputFile, numbersOutputFile) {
  try {    const inputData = await fs.readFile(numbersInputFile, 'utf-8');
    const numbers = JSON.parse(inputData);

 
    const multipliedNumbers = numbers.map(num => num * 2);

   
    const outputData = JSON.stringify(multipliedNumbers);
    await fs.writeFile(numbersOutputFile, outputData, 'utf-8');

    console.log('Processing complete. Check the output file:', numbersOutputFile);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

const numbersInputFile = 'samples/sample_input_numbers.json';
const numbersOutputFile = 'samples/sample_output_numbers.json';

transformNumbers(numbersInputFile, numbersOutputFile);
