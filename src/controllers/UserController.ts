import { User } from "../models/User";
import { UserRepository } from "../models/UserRepository";
import { Request, Response } from "express";

const userRepository = new UserRepository();

export class UserController{
    // constructor(
    //     userRepository: UserRepository,
    // ){}

    async createUser(req: Request, res: Response): Promise<void>{
        try{
            const {name, email, password} = req.body;
            const user = new User(0, name, email, password);
            await userRepository.create(user);
            res.status(201).json({
                code: 200,
                message: "User created",
                data: user
            })
        }catch(error: any){
            res.status(400).json({
                message: error.message,
                code: 400
            })
        }
    }

    async getUser(req: Request, res: Response): Promise<void> {
        const {id} = req.params;
        const user = await userRepository.findById(Number(id));
        if(user) {
            res.status(200).json(user);
        }else {
            res.status(404).send("user not found");
        }
    }

    async getAll(req: Request, res: Response): Promise<void> {
        try{
            const users = await userRepository.getAll();
            res.status(200).json(users);
        }catch(error){
            res.status(400).send("No user found");
        }
    }

}