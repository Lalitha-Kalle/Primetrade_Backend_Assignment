const express = require("express")
const router = express.Router()

const authRouter = require("./authRouter")
const taskRouter = require("./taskRouter")
const userRouter = require("./userRouter")

router.use("/auth", authRouter)
router.use("/users", userRouter)
router.use("/tasks",taskRouter)

module.exports = router