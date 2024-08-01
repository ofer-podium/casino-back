import 'dotenv/config';
import express,{Request,Response} from 'express';
import {json} from 'body-parser';


const app = express();
const port = process.env.PORT || 8080;

app.use(json());

// Health check
app.get('/',(req:Request,res:Response)=>{
    res.send('Health check');
});

// Fun check
app.get('/ping',(req:Request,res:Response)=>{
    res.send('pong');
});

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})