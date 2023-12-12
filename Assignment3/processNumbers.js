const fs = require('fs').promises;

async function processNumbers(inputFilePath, outputFilePath){
    try{
        const data = await fs.readFile(inputFilePath, 'utf-8');
        const numbers = JSON.parse(data);

        const doubledNumbers = numbers.map(num => num * 2);

        await fs.writeFile(outputFilePath, JSON.stringify(doubledNumbers));

        console.log('Processing completed successfully.');
    }catch(error){
        console.log('Error:', error.message);
    }
}

processNumbers('sample_input_numbers.json', 'output.json');