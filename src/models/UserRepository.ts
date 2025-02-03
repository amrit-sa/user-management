import Database from "../config/db";
import { User } from "./User";

export class UserRepository {
    public db = Database.getInstance();
    constructor() {}

    async create(user: User): Promise <void> {
        const query = "Insert into users (name, email, password) values (?, ?, ?)";
        await this.db.execute(query,[user.name, user.email, user.password])
    }

    async findById(id: number): Promise <User | null> {
        const query = "SELECT * from users where id = ?";
        const [rows] = await this.db.execute(query,[id]);
        const user = (rows as any[])[0];
        if(user){
            return new User(user.id, user.name, user.email);
        }
        return null;
    }

    async getAll(): Promise <User[]> {
        try{
            const query = "SELECT * from users";
            const [rows] = await this.db.execute(query);
            return rows as User[];
        } catch (error) {
            console.error("Error fetching users:", error);
            throw new Error("Could not fetch users");
        }
    }


}