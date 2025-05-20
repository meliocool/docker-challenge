import express from "express"

const PORT = 3000

const app = express()

app.use(express.json())

app.get("/", (req, res) => {
  res.json({ message: "PHP is Ass" })
})

app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello, world!" })
})

app.post("/api/echo", (req, res) => {
  res.json({ youSent: req.body })
})

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})
