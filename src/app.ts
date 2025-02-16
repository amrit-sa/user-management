import express from 'express';
import userRouter from './routes';
import bodyParser from 'body-parser';
import Database from './config/db';

const PORT = 3100;
const app = express();

app.use(bodyParser.json());
app.use('/api', userRouter);

(async ()=>{
    try{
        const db = Database.getInstance();
        const connection = await db.getConnection();
        console.log('DB connected');
        connection.release();
    }catch(error: any){
        console.error("Failed to connect to db", error.message)
    }
})()


app.get('/health-check',(req,res)=>{
    res.send("App is running")
})

app.listen(PORT, ()=>{
    console.log("app runing on port",PORT);
})
