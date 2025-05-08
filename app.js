const express = require("express");
const cors = require('cors');
const bodyPraser = require('body-parser')
const sequelize = require('./util/database')

const taskRoutes = require('./Routes/task')

const app = express();

app.use(cors())

app.use(bodyPraser.json())

app.use("/", taskRoutes);


sequelize.sync()
.then(() => {
    app.listen(3000);
})
.catch((err) => {
    console.log(err)
})

