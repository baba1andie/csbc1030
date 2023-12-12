const fs = require('fs').promises;

async function multiply(inputPath, outputPath) {
    try {

        const arrayFromJson = await fs.readFile(inputPath, 'utf-8');
        const numbers = JSON.parse(arrayFromJson);

        const newArray = numbers.map(number => number * 2);

        await fs.writeFile(outputPath, JSON.stringify(newArray));

        console.log(' successful! ', outputPath);
    } catch (error) {
        console.error('Error in Reading the file:', error.message);
    }
}


const inputPath = './Input.JSON';
const outputPath = './Output.JSON';


multiply(inputPath, outputPath);
