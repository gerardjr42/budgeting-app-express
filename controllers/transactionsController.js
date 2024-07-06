const express = require("express")
const { nanoid } = require("nanoid")

const transactions = express.Router()

const transactionsArray = require("../models/transaction")

//Get all transactions
transactions.get("/", (req, res) => {
  res.json(transactionsArray)
})

//Get single transaction by id
transactions.get("/:id", (req, res) => {
  try {
    const { id } = req.params;
    const transaction = transactionsArray.find((transaction) => transaction.id === id)

    if (!transaction) throw new Error(`No transaction with id: ${id}`)
    res.status(200).send(transaction)
  } catch (error) {
    // console.log(error)
    //Error is an obj but we need just the message, so we need to key into it
    res.status(404).json({ error: error.message });
  }
});

//Create a new transaction
transactions.post("/", (req, res) => {
  transactionsArray.push({id: nanoid(), ...req.body});
  res.json(transactionsArray[transactionsArray.length - 1]);
});

//Update a single transaction
transactions.put("/:id", (req, res) => {
  const { id } = req.params;
  const transactionIndex = transactionsArray.findIndex((transaction) => transaction.id === id)
  transactionsArray[transactionIndex] = {...transactionsArray[transactionIndex], ...req.body}

  res.json(transactionsArray[transactionIndex]);
});

//Delete a single transaction

transactions.delete("/:id" , (req, res) => {
  const { id } = req.params;
  const transactionIndex = transactionsArray.findIndex((transaction) => transaction.id === id)
  
  res.json(transactionsArray.splice(transactionIndex, 1)[0]);
})


module.exports = transactions