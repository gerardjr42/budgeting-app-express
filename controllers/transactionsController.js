const express = require("express")
const { nanoid } = require("nanoid")

const transactions = express.Router()

const transactionsArray = require("../models/transaction")

//Get all transactions
transactions.get("/", (req, res) => {
  if(transactionsArray[0]) {
    res.status(200).send(transactionsArray)
  } else {
    res.status(404).json({error: "Can't find any transactions"})
  }
})

//Get single transaction by id
transactions.get("/:id", (req, res) => {
  try {
    const { id } = req.params;
    const transaction = transactionsArray.find((transaction) => transaction.id === id)

    if (!transaction) throw new Error(`No transaction with id: ${id}`)
    res.status(200).send(transaction)
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

//Create a new transaction
transactions.post("/", (req, res) => {
  try {
    transactionsArray.push({id: nanoid(5), ...req.body});
    res.json(transactionsArray[transactionsArray.length - 1]);
  } catch (error) {
    res.status(404).json({error: error.message})
  }
});

//Update a single transaction
transactions.put("/:id", (req, res) => {
  const { id } = req.params;
  const transactionIndex = transactionsArray.findIndex((transaction) => transaction.id === id)
  transactionsArray[transactionIndex] = {...transactionsArray[transactionIndex], ...req.body}

  res.json(transactionsArray[transactionIndex]);
});

//Delete a single transaction
transactions.delete("/:id", (req, res) => {
  try {
    const { id } = req.params;
    const transactionIndex = transactionsArray.findIndex((transaction) => transaction.id === id)

    if(transactionIndex !== -1) {
      res.json(transactionsArray.splice(transactionIndex, 1)[0]);
      res.redirect("/transactions")
    }
  } catch (error) {
    res.status(404).json({error: error.message})
  }
})

module.exports = transactions