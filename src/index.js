import express from 'express'
import cors from 'cors'
import "./db/prismaClient.js"
import 'dotenv/config.js'
import userRouter from './routes/auth.js'
import Profilesrouter from './routes/profile.js'
const app = express()
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());



app.use('/auth',userRouter)
app.use('/profile',Profilesrouter)
app.listen(4001, () => {
    console.log('server running...');
})