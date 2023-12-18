
fetchData = async () => {
    const fsPromises = require('fs').promises;

    const jsonArrayData = await fsPromises.readFile('./resources/sample_input_numbers.json')
        .then((data) =>{
          console.log(data);
          return JSON.parse(data.toString());
        })
        .catch((err) =>{
                console.error('Failed to read file', err);
        });

    return jsonArrayData;
}

writeData = async (inputArray, fileName) => {
    const fsPromises = require('fs').promises;
    await fsPromises.writeFile('./resources/'+fileName, JSON.stringify(inputArray))
        .then((success) => {
            console.log('success writing', success);
        })
        .catch( (error) => {
            console.log('error while writing output file', error);
        });
}

let readFilePromise = fetchData();

let outputArray = readFilePromise.then(data => {
    let multipliedData = data.map(entry => entry*2);
    console.log(multipliedData);
    writeData(multipliedData, 'sample_output_numbers.json');
    return multipliedData;
    }

)




