import express from "express"
import dotenv from "dotenv"
import Database from "./database.js"
import { cors } from "./middleware.js"

dotenv.config()
const app = express()
const PORT = process.env.PORT || 3003

new Database().start().catch(e => {})

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})


app.use(express.urlencoded({ extended: true }))
app.use(express.json({ limit: "100mb" }))

// API Routes
import users from "./api/user.js"
import upload from "./api/upload.js"

app.use("/api/users", cors, users)
app.use("/api/upload", cors, upload)

app.get("/", cors, (_, res) => {
	res.status(200).send("API Here")
})

app.get("/ping", cors, (_, res) => {
	res.status(200).send("pong")
})

app.get("*", cors, (_, res) => {
	res.sendStatus(404)
})
