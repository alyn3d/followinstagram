require("dotenv").config();
const http = require("http");
const express = require("express");


const app = express();
app.use(require("./routes"));

const PORT = process.env.PORT || 3350;
const server = http.createServer(app);
server.listen(PORT);
console.log(`App live on port: ${PORT}`);