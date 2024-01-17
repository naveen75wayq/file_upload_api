import express from 'express';
import uploadRouter from './routes/upload'
const app = express();
const port = 3000;

app.use('/', uploadRouter)

app.listen(port,()=>{
    console.log(`Server is running on port http://localhost:${port}`);
})