
const  mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

const connectDB = (url) => {
  mongoose.connect(url)
  .then(() => {
    console.log('DB connected')
  })
  .catch((err) => {
    console.log('Not connected', err)
  })
}  

module.exports = connectDB
