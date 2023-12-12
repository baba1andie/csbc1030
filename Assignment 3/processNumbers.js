const fs = require("fs").promises;

async function processNumbers() {
  try {
    const inputData = await fs.readFile("./sample_input_numbers.json", "utf8");
    const { numbers } = JSON.parse(inputData);

    const multipliedNumbers = numbers.map((num) => num * 2);

    await fs.writeFile(
      "./sample_output_numbers.json",
      JSON.stringify({ numbers: multipliedNumbers })
    );

    console.log("Processing completed.");
  } catch (error) {
    console.error("Error:", error);
  }
}

processNumbers();
