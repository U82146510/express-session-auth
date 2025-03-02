import { Router } from "express";
import {login_user,register_user} from '../controllers/user.ts';

export const user:Router = Router();

user.post('/register',register_user);
user.post('/login',login_user);