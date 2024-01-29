//dependencies
const express = require("express");
const app = express();

//routes
const indexRouter = require("./routes/index");


//setup routes
app.use(express.json());
app.use("/", indexRouter);

//start server
console.log("Started on port 4500");
app.listen(process.env.PORT || 4500);