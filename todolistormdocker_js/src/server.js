import express from "express"
import path, { dirname } from "path"
import { fileURLToPath } from "url"
import authRoutes from "./routes/authRoutes.js"
import todoRoutes from "./routes/todoRoutes.js"
import authMiddleware from "./middleware/authMiddleware.js"

const app = express()
const PORT = process.env.PORT || 5000

// Get the file path from the URL of the current module
const __filename = fileURLToPath(import.meta.url)
// Get the directory name from the file path
const __dirname = dirname(__filename)

/*
Middleware
*/
app.use(express.json())
// Serves the HTML file from the /public directory
// Also tells express to serve all files from the public folder as static assets / file
// Any requests from the css files will be resolved to the public directory
app.use(express.static(path.join(__dirname, "../public"))) // Goin up one level

// Serving HTML from /public directory
// Kinda like python
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"))
})

// Routes
app.use("/auth", authRoutes)
app.use("/todos", authMiddleware, todoRoutes)

app.listen(PORT, () => {
  console.log(`Server is up and running on Port: ${PORT}`)
})
