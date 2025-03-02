import session from "express-session";
declare module 'express-session'{
    interface SessionData{
        user?:{name:string,id:string}
    }
}