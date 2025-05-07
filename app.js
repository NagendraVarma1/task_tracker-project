const express = require("express");

const app = express();

app.use("/", () => console.log("testing"));

app.listen(3000);
