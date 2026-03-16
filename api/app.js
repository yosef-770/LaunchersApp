import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { connectDB } from './db'

const app = express();
const PORT = process.env.PORT;

app.use(cors())
app.use(express.json)

