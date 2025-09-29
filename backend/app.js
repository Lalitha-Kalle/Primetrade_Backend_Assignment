const express = require("express")
const dotenv = require("dotenv")
const connectDB = require("./src/db/database")
const { PORT,MONGO_URL } = require("./src/config/env")
dotenv.config()

const app = express()

app.use(express.json())

connectDB(MONGO_URL)

app.listen(PORT, () => {
  console.log(`server running at ${PORT}`)
})