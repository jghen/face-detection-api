import express from "express";
import bcrypt from "bcrypt";
import cors from "cors";
import knex from "knex";
import * as dotenv from "dotenv";
import { handleRegister } from './routes/register.js';
import { handleSignin } from "./routes/signin.js";
// import { getProfile } from './routes/profile.js';
import { handleImage } from "./routes/image.js";
import {handleApiCall} from "./routes/imageUrl.js"

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: "face_detection_db",
  },
});

app.get("/", (req, res) => res.send("success"));

app.get('/favicon.ico', (req, res) => res.status(204));

app.post("/register", (req, res) => Promise.resolve(handleRegister(req, res, db, bcrypt)));

app.post("/signin", (req, res) => handleSignin(req, res, db, bcrypt));

// app.get("/profile/:id", (req, res) => getProfile(req, res, db));

app.put("/image", (req, res) => handleImage(req, res, db));

app.post("/imageUrl", (req, res) => handleApiCall(req, res));

app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));


