const app = require("./app")

require("dotenv").config()
const PORT = process.env.PORT

//Listen to server
app.listen(PORT, () => {
  console.log(`Listening to PORT: ${PORT}`)
})