import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { User } from "./models/user.models.js";
import bcrypt from "bcryptjs";
import { Prisoner } from "./models/Prisoner.models.js";

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

const saltrounds = 4;

const hashedPassword = async (password) => {
  const salt = await bcrypt.genSalt(saltrounds);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};
const verifyPassword = async (passwordentered, storedpassword) => {
  const isMatch = await bcrypt.compare(passwordentered, storedpassword);
  return isMatch;
};

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
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json("User already exists");
    }

    const hashPassword = await hashedPassword(password);

    const newUser = await User.create({
      username,
      email,
      password: hashPassword,
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json("Server error");
  }
});
app.post("/api/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    await User.findOne({ username: username }).then((user) => {
      if (user) {
        if (verifyPassword(password, user.password)) {
          res.json("Success");
        } else {
          res.json("Password Incorrect");
        }
      } else {
        res.json("Invalid Credentials");
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Invalid Password or username" });
  }
});

app.post("/api/prisonerdets", async (req, res) => {
  try {
    const {
      Name,
      resadd,
      peradd,
      adharnum,
      prisonbefore,
      firdate,
      datetrial,
      crime,
    } = req.body;
    await Prisoner.create({
      Name: Name,
      ResAddress: resadd,
      PerAddress: peradd,
      AddharNum: adharnum,
      prisonbefore: prisonbefore,
      FIRdate: firdate,
      DateTrial: datetrial,
      Crime: crime,
    }).then(()=>res.json("Added"))
    .catch((err)=>res.json(err))
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Every Field is Mandatory" });
  }
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
