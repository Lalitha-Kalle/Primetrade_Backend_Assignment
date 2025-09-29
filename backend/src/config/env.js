require("dotenv").config()

const { PORT, MONGO_URL,JWT_SECRET, JWT_EXPIRES_IN, SALT_ROUNDS } = process.env

module.exports = {
  PORT,
  MONGO_URL,
  JWT_SECRET,
  JWT_EXPIRES_IN,
  SALT_ROUNDS
}