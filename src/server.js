const http = require("http");
const cors = require("cors");
const express = require("express");
const prisma = require("./prisma");
const app = express();

const server = http.createServer(app);

app.use(cors());

app.get("/", async (req, res) => {
  const users = await prisma.user.findMany();
  return res.status(200).json({ users });
});

app.post("/user", async (req, res) => {
  const { userName, email } = req.body;
  const user = await prisma.user.create({
    data: {
      email,
      userName,
    },
  });
  return res.status(201).json({ message: "User created Successfully", user });
});

app.get("/users", async (req, res) => {
  const users = await prisma.user.findMany({});
  return res.status(200).json({ message: "All Users", users });
});

server.listen(3000, () => {
  console.log("Listening on http://localhost:8000");
});
