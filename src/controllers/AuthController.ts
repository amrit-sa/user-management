import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { body } from "express-validator";
import { userRepository } from "./UserController";


export class AuthController {

    async login(req: Request, res: Response): Promise<void> {
        try{
            const {email, password} = req.body;
            await body('email').isEmail().run(req);
            await body('password').isLength({ min: 6 }).run(req);
            const user = await userRepository.findByField('email',email);
            if(user && user.password){
                console.log(password, user.password)
                const isMatch = await bcrypt.compare(password, user.password);
                if(isMatch){
                    res.status(200).json({
                        code: 200,
                        message: "Logged in successfully",
                        data: {name: user.name, email: user.email}
                    })
                }else{
                    res.status(401).json({
                        message: "Invalid credentials",
                        code: 401
                    })
                }
            }

        }catch(error: any){
            res.status(400).json({
                message: error.message,
                code: 400
            })
        }
    }
}