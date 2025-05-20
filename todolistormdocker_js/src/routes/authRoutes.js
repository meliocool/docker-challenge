import express from "express"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import prisma from "../prismaClient.js"

const router = express.Router()

// Register a new user EndPoint /auth/register
router.post("/register", async (req, res) => {
  const { username, password } = req.body
  // Saves username and an encrypted possword
  // goyounjung@gmail.com | asdjadhwo8dho812eas

  // Encrypt the password
  const hashedPassword = bcrypt.hashSync(password, 8)

  // Save new user with hashed pw to db
  try {
    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    })

    // User has now been inserted, now add their first to do
    const defaultToDo = `Hello! Add your first ToDo!`
    await prisma.todo.create({
      data: {
        task: defaultToDo,
        userId: user.id,
      },
    })

    // Create a token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    })
    res.json({ token })
  } catch (err) {
    console.log(err.message)
    res.sendStatus(503)
  }
})

router.post("/login", async (req, res) => {
  // Get the email, then loop up the password associated with that email
  // Use one way encrypt because the password in the db is
  // E N C R Y P T E D
  const { username, password } = req.body
  try {
    const user = await prisma.user.findUnique({
      where: {
        username: username,
      },
    })

    if (!user) {
      return res.status(404).send({ message: "User not found" })
    }

    // is this even real
    const passwordIsValid = bcrypt.compareSync(password, user.password)
    if (!passwordIsValid) {
      return res.status(401).send({ message: "Invalid password" })
    }
    console.log(user)

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    })
    res.json({ token })
  } catch (err) {
    console.log(err.message)
    res.sendStatus(503)
  }
})

export default router
