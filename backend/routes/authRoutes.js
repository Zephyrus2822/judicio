import express from 'express';

import UserControllers from '../controllers/UserControllers.js';

const authRouter=express.Router();

authRouter.post('/login',UserControllers.login)
authRouter.post('/register',UserControllers.SignUp)
authRouter.post('/register/officials',UserControllers.SignUpOfficials)

export default authRouter