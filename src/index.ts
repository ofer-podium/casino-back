import 'dotenv/config';
import express,{Request,Response} from 'express';
import {json} from 'body-parser';
import cors from 'cors';
import {validateAppToken} from './controllers/auth';
import routes from './routes/main';

const app = express();
const port = process.env.PORT || 8080;

app.use(json());
app.use(cors());

// Health check
app.get('/',(req:Request,res:Response)=>{
    res.send('Health check');
});

// Auth middleware
app.use(validateAppToken);

// Routes
routes.forEach((route) => {
    app.use(route.path, route.router);
  });
  
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})