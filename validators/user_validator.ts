import Joi from 'joi';


export const register_schema = Joi.object({
    name:Joi.string().required(),
    email:Joi.string().email().required(),
    password:Joi.string().min(6).required()
});
export const login_schema = Joi.object({
    email:Joi.string().email().required(),
    password:Joi.string().min(6).required()
});