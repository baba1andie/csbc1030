const fs = require('fs').promises;

async function processNumbers(input_file_path, output_file_path) {
  try {
  
    const data = await fs.readFile(input_file_path, 'utf-8');
    const arrayNumbers = JSON.parse(data);

    const output = arrayNumbers.map(num => num * 2);

    await fs.writeFile(output_file_path, JSON.stringify(output), 'utf-8');

    console.log('Processing complete. Check the output file:', output_file_path);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Example usage
const input_file_path = 'samples/sample_input_numbers.json';
const output_file_path = 'samples/sample_output_numbers.json';

processNumbers(input_file_path, output_file_path);
