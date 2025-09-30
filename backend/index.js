const express = require("express")
const dotenv = require("dotenv")
const connectDB = require("./src/db/database")
const { PORT,MONGO_URL } = require("./src/config/env")
const cors = require("cors")
const apiRoutes = require("./src/routes/index")
dotenv.config()

const app = express()


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/api", apiRoutes)

app.get("/", (req, res) => res.send("Hello"))

connectDB(MONGO_URL)

app.listen(PORT, () => {
  console.log(`server running at ${PORT}`)
})