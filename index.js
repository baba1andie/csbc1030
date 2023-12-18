//index.js
const process = require('process');
const express = require("express");
const app = express();
const users = require("./routes/users");
app.use(express.json());
app.use("/users", users);

const PORT = process.env.PORT || 3000;

app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(500).json({ error: "Internal Server Error" });
});
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
