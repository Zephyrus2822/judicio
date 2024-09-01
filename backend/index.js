import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { User } from "./models/user.models.js";

const app = express();
app.use(
  cors({
    origin: "*",
    methods: "GET, POST, PUT, DELETE",
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());
const port = 3000;
dotenv.config();

const dbconn = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URL);
    console.log(`Mongo DB connected Successfully : ${conn.connection.host}`);
  } catch (error) {
    console.error(error);
  }
};
dbconn();

app.post("/api/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    await User.findOne({ email: email }).then((user) => {
      if (user) {
        res.json("User Already Exists ");
      } else {
        User.create(req.body)
          .then(() => res.json("User Created Successfully"))
          .catch((err) => res.json(err));
          // console.log(error)
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Invalid Password or username" });
  }
});
app.post("/api/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    await User.findOne({ username: username, password: password }).then(
      (user) => {
        if (user) {
          res.json("Success");
          
        } else {
          res.json("Invalid Credentials");
        }
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Invalid Password or username" });
  }
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
