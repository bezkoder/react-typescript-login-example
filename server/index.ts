import express, { Express } from "express";
const cors = require("cors");
const morgan = require("morgan");
import dotenv from "dotenv";

dotenv.config();
const app: Express = express();
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

app.listen(process.env.PORT, () => console.log("Express is running"));
