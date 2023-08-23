import { Router } from "express";
//importo las funciones para usarlas en las peticiones.
import { login, register, logout, profile,verifyToken } from "../controllers/auth.controller.js"
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from '../middlewares/validator.middleware.js';
import { registerSchema, loginSchema } from "../schemas/auth.schema.js";

const router = Router();
//cuando se haga alguna de estas peticiones, ejecutará las funciones traidas desde controllers
router.post('/register', validateSchema(registerSchema), register);

router.post('/login', validateSchema(loginSchema), login);

router.post('/logout', logout);

router.get('/verify',verifyToken);

router.get('/profile', authRequired, profile);

export default router;