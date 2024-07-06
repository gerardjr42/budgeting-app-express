const express = require("express")
const app = express()

const transactionsController = require("./controllers/transactionsController")

//middleware
app.use(express.json())

//controllers
app.use("/transactions", transactionsController)


//Routes go here
app.get("/", (req, res) => {
  res.status(200).send("Hello World!")
})

module.exports = app