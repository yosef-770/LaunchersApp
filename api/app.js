import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { connectDB } from './db.js'
import aunchersRouter from './routes/launchers.route.js'
import errorHandler from './middleware/errorHandler.js'
import authRouter from './routes/auth.route.js'
import * as authService from './services/auth.service.js'



const app = express();
const PORT = process.env.PORT;

app.use(cors({ origin: '*'}))
app.use(express.json())
app.use('/api/launchers', aunchersRouter)
app.use('/api/auth', authRouter)

app.use(errorHandler)

connectDB().then(async () => {
    await authService.register({ username: 'admin', password: '770770', email: 'yossi@idf.co.il', user_type: 'admin' })
    app.listen(PORT, () => {
        console.log('Server running on port', PORT)
    })
}).catch((err) => {
    console.error('MongoDB failed', err)
})

