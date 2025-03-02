import {redis_client} from '../config/redis.ts';
import session from 'express-session';

class redis_stor extends session.Store {
    async get(sid:string,callback:(err:any,session?:any)=>void){
        try {
            const session_data = await redis_client.get(`sess:${sid}`);
            callback(null,session_data ? JSON.parse(session_data):null)
        } catch (error) {
            callback(error)
        }
    }
    async set(sid:string,session:any,callback:(err?:any)=>void){
        try {
            await redis_client.set(`sess:${sid}`,JSON.stringify(session),{
                EX:60*30,
            });
            callback();
        } catch (error) {
            callback(error);
        }
    }
    async destroy(sid:string,callback:(err?:any)=>void){
        try {
            await redis_client.del(`sess:${sid}`);
            callback();
        } catch (error) {
            callback(error);
        }
    }
}


export const redis_store =  new redis_stor()
