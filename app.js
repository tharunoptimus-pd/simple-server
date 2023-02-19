import express from "express"
import dotenv from "dotenv"
import { cors } from "./middleware.js"

dotenv.config()
const app = express()
const PORT = process.env.PORT || 3003

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})

app.use(express.urlencoded({ extended: true }))
app.use(express.json({ limit: "100mb" }))

// API Routes
import upload from "./api/upload.js"

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
