export interface user_register{
    name:string;
    email:string;
    password:string;
};

export function assert_user_reg(value:any):asserts value is user_register{
    if(typeof value !== 'object' || !("name" in value) || value===null) {
        throw new Error("user body incorrect")
    }
};

export interface user_login{
    email:string;
    password:string;
}

export function assert_user_login(value:any):asserts value is user_register{
    if(typeof value !== 'object' || !("name" in value) || value===null) {
        throw new Error("user body incorrect")
    }
};

interface user_session{
    name:string;
    id:string;
}

export function assert_user_session(value:any):asserts value is user_session{
    if(typeof value !=='object'|| value===null || !("name" in value) || ("id" in value)){
        throw new Error('user session incorrect')
    }
}