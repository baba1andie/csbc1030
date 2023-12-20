/* eslint-env node */
const express = require("express");
const server = express(); // Changed variable name to 'server'
const userRoutes = require("./routes/userRoutes");
const errorHandler = require('./errorHandlers/errorHandler');

server.use(express.json());
server.use(errorHandler);
server.use("/users", userRoutes); // Changed variable name to 'userRoutes'
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT}`);
});

module.exports = server;
