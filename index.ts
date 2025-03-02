import express,{type Application} from 'express';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import cors from 'cors';
import {redis_client} from './config/redis.ts';
import session from 'express-session';
import {dashboard} from './routes/dashboard.ts';
import {redis_store} from './middleware/cache_services.ts';
import {connect_to_atlas} from './config/mongodb.ts';
import {error_handler} from './error/error_handler.ts';
import {user} from './routes/user.ts';
import {authorize} from './auth/auth.ts';

dotenv.config();

const app:Application = express();
const port = process.env.port || 4000
const limiter = rateLimit({
    windowMs:15*60*1000,
    max:100,
    message:'too many requests from this IP',
    headers:true,
})


const coockie_secret = process.env.coockie_secret;
if(!coockie_secret){
    throw new Error('missing coockie secret');
}

app.use(express.json());
app.use(limiter);
app.use(cors({
    methods:["GET","POST","DELETE","PUT"],
    credentials:true
}));
app.use(session({
    secret:coockie_secret,
    resave:false,
    saveUninitialized:false,
    rolling:true,
    store:redis_store,
    cookie:{
        httpOnly:false,
        maxAge:1000*60*30
    }
}))


app.use('/',authorize,dashboard);
app.use('/',user);
app.use(error_handler);
const start = async()=>{
    try {
        await redis_client.connect();
        await connect_to_atlas()
        app.listen(port,()=>console.log(`On port:${port}`));
    } catch (error) {
        
    }
};

start();