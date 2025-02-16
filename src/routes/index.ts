import express from "express";
import { UserController } from "../controllers/UserController";
import Database from "../config/db";
import { AuthController } from "../controllers/AuthController";

const userRouter = express.Router();
const userController = new UserController();
const authController = new AuthController();

userRouter.get('/test-connection', async (req,res)=>{
    try{
        const db = Database.getInstance();
        const connection = await db.getConnection();
        res.send('DB connection successful');
        connection.release();
    } catch(err:any) {
        res.status(500).send(err.message)
    }
})
userRouter.post('/users', userController.createUser);
userRouter.get('/users/:id', userController.getUser);
userRouter.get('/users', userController.getAll);
userRouter.post('/login', authController.login)

export default userRouter;