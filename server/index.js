const express = require("express");
const app = express();
const cors = require("cors");
const http = require("http");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const routes = require("./src/routes/index.js").router 
require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/api/v1", routes); 

const PORT = process.env.PORT || 5000;
const server = http.createServer(app);

mongoose
  .connect(process.env.DB_STRING)
  .then(() => {
    console.log("DATABASE CONNECTED");
    server.listen(PORT, () => {
      console.log(`SERVER LISTENING ON PORT ${PORT}`);
    });
  })
  .catch((err) => {
    console.error(err.message);
    process.exit(1);
  });
