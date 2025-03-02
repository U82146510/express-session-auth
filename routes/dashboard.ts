import { Router } from "express";
import {get_all_users,update_password,update_email} from '../controllers/dashboard.ts';

export const dashboard:Router = Router();

dashboard.get('/admin',get_all_users);
dashboard.get('/admin',update_password);
dashboard.get('/admin',update_email);