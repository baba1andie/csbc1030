const fs = require('fs');
const mysql = require('mysql2');
const path = require('path');

// MySQL database connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Replace with your MySQL username
  password: 'jobin123', // Replace with your MySQL password
  database: 'project_app' // Replace with your MySQL database name
});

// Function to seed data from JSON file to a MySQL table
function seedData(filePath, tableName) {
  // Read JSON file
  const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  // Insert each record into the database
  jsonData.forEach(record => {
    const keys = Object.keys(record).join(', ');
    const values = Object.values(record);
    const placeholders = values.map(() => '?').join(', ');

    const query = `INSERT INTO ${tableName} (${keys}) VALUES (${placeholders})`;
    connection.query(query, values, (err, result) => {
      if (err) {
        console.error(`Error inserting into ${tableName}:`, err);
      } else {
        console.log(`Inserted into ${tableName}:`, result.insertId);
      }
    });
  });
}

// Seed each table
seedData(path.join(__dirname, 'users.json'), 'users');
seedData(path.join(__dirname, 'posts.json'), 'posts');
seedData(path.join(__dirname, 'comments.json'), 'comments');

// Close the database connection
connection.end();
