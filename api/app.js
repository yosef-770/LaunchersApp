import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { connectDB } from './db.js'
import aunchersRouter from './routes/launchers.route.js'
import errorHandler from './middleware/errorHandler.js'


const app = express();
const PORT = process.env.PORT;

app.use(cors())
app.use(express.json())
app.use('/api/launchers', aunchersRouter)
app.use(errorHandler)

connectDB().then(()=> {
    app.listen(PORT, () => {
        console.log('Server running on port', PORT)
    })
}) .catch((err) => {
    console.error('MongoDB failed', err)
})

