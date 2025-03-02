import { createClient } from "redis";
import dotenv from 'dotenv';
dotenv.config();

const redis_host:string = process.env.redis_host as string;
const redis_port:number = 6379;



if(!redis_port||!redis_host){
    throw new Error('redis connection string missing');
}

export const redis_client = createClient({
    socket:{
        host:redis_host,
        port:redis_port
    }
});


redis_client.on('error',(error)=>{
    console.error(error);
    process.exit(1);
});

redis_client.on('connect',()=>{
    console.log('redis connected');
});

process.on('SIGINT',async()=>{
    await redis_client.quit();
    process.exit(0);
})

