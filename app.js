import express from "express"
import dotenv from "dotenv"
import Database from "./database.js"
import { cors } from "./middleware.js"

dotenv.config()
const app = express()
const PORT = process.env.PORT || 3003

new Database().start().then(() => {
	app.listen(PORT, () => {
		console.log(`Server running on port ${PORT}`)
	})
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// API Routes
import users from "./api/user.js"

app.use("/api/users", cors, users)

app.get("/", cors, (_, res) => {
	res.status(200).send(content)
})

app.get("/ping", cors, (_, res) => {
	res.status(200).send("pong")
})

app.get("*", cors, (_, res) => {
	res.sendStatus(404)
})
