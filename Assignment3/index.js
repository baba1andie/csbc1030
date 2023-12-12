const fs = require('fs');

async function processNumbers() {
    try {
      //1. Read an array of numbers from a JSON file
      const inputFilePath = 'samples/sample_input_numbers.json';
      const inputData = await fs.readFileSync(inputFilePath, 'utf-8');
      console.log('Input Data:',inputData)
       
      const parsedData = JSON.parse(inputData);
      const numbers = parsedData.numbers;
      console.log('Parsed Numbers:',numbers)
  
      //2. Multiply numbers by two
      const doubledNumbers = numbers.map(num => num * 2);
  
      //3. Write the doubled numbers to a new file
      const outputFilePath = 'samples/sample_output_numbers.json';
      await fs.writeFileSync(outputFilePath, JSON.stringify(doubledNumbers));
  
      console.log('Processing completed. Doubled numbers written in outputfile');
    } catch (error) {
      console.error('Error:', error.message);
    }
  }
  
  // Run the async function
  processNumbers();