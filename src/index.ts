import express from 'express';
import uploadRouter from './routes/upload'
import { connectToDb } from './database/db';
import authRouter from './routes/auth'
import bodyParser from 'body-parser';
import createApp from '../src/routes/createApp'
import { getBucktPath } from './controllers/uploadController';
const app = express();
const port = 3000;
app.use(bodyParser.json({limit: "30mb"}))
app.use(bodyParser.urlencoded({limit:"30mb", extended: true}))
app.use('/', uploadRouter,createApp)
app.use('/auth',authRouter)

app.listen(port,async ()=>{
    await connectToDb();
    console.log(`Server is running on port http://localhost:${port}`);
})