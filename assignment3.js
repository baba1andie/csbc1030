const fs = require('fs').promises;

async function multiplyNumbers(inputNumberFile, outputNumberFile) {
  try {
    const inputData = await fs.readFile(inputNumberFile, 'utf8');

    const numbers = JSON.parse(inputData);
    const multipliedNumbers = numbers.map(num => num * 2);

    await fs.writeFile(outputNumberFile, JSON.stringify(multipliedNumbers));
    console.log('Multiplication of numbers are done.');
  } catch (error) {
    console.error('Error:', error);
  }
}

const inputNumberFile = 'samples/sample_input_numbers.json';
const outputNumberFile = 'samples/sample_output_numbers.json';
multiplyNumbers(inputNumberFile, outputNumberFile);