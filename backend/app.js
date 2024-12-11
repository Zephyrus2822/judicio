import express from "express";
import cors from "cors";
import { connectDb } from "./db/index.js";
import authRouter from "./routes/authRoutes.js";
import bodyParser from "body-parser";
import caseRouter from "./routes/caseRoutes.js";
import applicationRouter from "./routes/applicationRoutes.js";
import prisonerRouter from "./routes/prisonerRotes.js";

import { Resend } from 'resend';


const app = express();
app.use(bodyParser.json());
app.use(
  cors({
    origin: "*",

    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

connectDb()

app.get("/", (req, res) => {
  res.send("App is Working !!");
});

//Routes
app.use('/auth',authRouter)

app.use('/api/cases',caseRouter)

app.use('/api/applications',applicationRouter)

app.use('/api/prisoners',prisonerRouter)

const resend = new Resend('re_AV2CGuKT_81siCzYDoVq8Xk7m8BKqHGFF');
app.get("/send-email", async (req, res) => {
  const { data, error } = await resend.emails.send({
    from: "Acme <onboarding@resend.dev>",
    to: ["chandanramgar@gmail.com"],
    subject: "hello world",
    html: "<strong>it works!</strong>",
  });
  console.log(data)

  if (error) {
    return res.status(400).json({ error });
  }

  res.status(200).json({ data });
});



app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
