const fs = require("fs");

fs.readFile("samples/sample_input_numbers.json", "utf8", (error, data) => {
    if (error) {
        const output = "Error reading sample_input_numbers.json file... " + error;
        console.error(output);
        fs.writeFileSync("samples/sample_output_numbers.json", JSON.stringify(output));
    }
    try {
        const inputArray = JSON.parse(data);
        const output = inputArray.map(n => n * 2);
        console.log(output);
        fs.writeFileSync("samples/sample_output_numbers.json", JSON.stringify(output));
    } catch (parseError) {
        const output = "Error parsing sample_input_numbers.json file... " + parseError;
        console.error(output);
        fs.writeFileSync("samples/sample_output_numbers.json", JSON.stringify(output));
    }
});