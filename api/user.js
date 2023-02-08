import express from "express"
import User from "../schemas/UserSchema.js"

const app = express()
const router = express.Router()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

router.get("/", (_, res) => {
	res.send({ message: "USER API ONLINE" })
})

router.get("/all", async (_, res) => {
	try {
		const users = await User.find({})
		res.status(200).send(users)
	} catch (error) {
		res.status(500).send({ error })
	}
})

router.get("/:userId", async (req, res) => {
	try {
		const user = await User.findById(req.params.userId)
		res.status(200).send(user)
	} catch (error) {
		res.status(500).send({ error })
	}
})

router.post("/create", async (req, res) => {
	try {
		const user = await User.create(req.body)
		res.status(201).send(user)
	} catch (error) {
		res.status(500).send({ error })
	}
})

router.delete("/delete/:userId", async (req, res) => {
	try {
		const user = await User.findByIdAndDelete(req.params.userId)
		res.status(200).send(user)
	} catch (error) {
		res.status(500).send({ error })
	}
})

export default router
