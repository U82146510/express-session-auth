import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

const atlas = process.env.atlas
if(!atlas){
    throw new Error('missing connection string');
}

export const connect_to_atlas = async()=>{
    try {
        await mongoose.connect(atlas)
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

const db:mongoose.Connection = mongoose.connection;

db.on('error',(error)=>{
    console.error(error);
    process.exit(1);
});
db.on('connected',()=>{
    console.log('Atlas connected');
});
db.on('reconnected',()=>{
    console.log("reconnect to Atlas");
});
process.on("SIGINT",async()=>{
    await db.close();
    process.exit(0);
});