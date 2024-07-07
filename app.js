const express = require("express")
const cors = require("cors")
const app = express()

const transactionsController = require("./controllers/transactionsController")

//middleware
app.use(express.json())
app.use(cors())

//controllers
app.use("/transactions", transactionsController)


//Routes go here
app.get("/", (req, res) => {
  res.status(200).send("Hello World!")
})

//Catchall Wildcard Route
app.get("*", (req, res) => {
  res.status(404).json({error: "Page not Found"})
})

module.exports = app