import express from 'express'
import cors from 'cors'
import "./db/prismaClient.js"
import 'dotenv/config.js'
import userRouter from './routes/auth.js'
import Profilesrouter from './routes/profile.js'
import axios from 'axios'
import httpProxy from "http-proxy"
import createProxyHandler from './utils/proxyHandler.js'
const app = express()
const apiProxy = httpProxy.createProxyServer();
apiProxy.on('error', (err, req, res) => {
    console.error(err);
    res.status(500).send('Proxy error');
});
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());


app.get('/test',(req,res) => {
    console.log(req.url);
    res.json({message:'test'})
})
app.all("/v1/*", createProxyHandler(process.env.API_URL))
app.use('/auth',userRouter)
app.use('/profile',Profilesrouter)
app.listen(4001, () => {
    console.log('server running...');
})