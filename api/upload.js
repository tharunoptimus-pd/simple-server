import express from "express"
import fs from "fs"
import path from "path"
import multer from "multer"

import url from "url"

const __filename = url.fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const router = express.Router()
const upload = multer({ dest: "uploads/" })

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

router.get("/", (_, res) => {
	res.send({ message: "UPLOAD API ONLINE" })
})

router.get("/file", (_, res) => {
	res.status(200).send({ message: "UPLOAD API ONLINE" })
})

// a route to upload a file
router.post("/file", upload.single("file"), (req, res) => {
	if (!req.file) {
		res.status(400).send({ message: "No file uploaded" })
		return
	}

	let filePath = `uploads/${req.file.originalname}`
	let tempPath = req.file.path

	let targetPath = path.join(__dirname, `../${filePath}`)

	fs.rename(tempPath, targetPath, async (err) => {
		if (err != null) {
			console.log(err)
			res.status(500).send({ message: "Error uploading file" })
		}
	})

	res.send({ message: "File uploaded successfully" })
})

export default router
