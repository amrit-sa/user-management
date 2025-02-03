import mysql, { Pool } from 'mysql2/promise';

class Database {
    private static instance : Pool
    
    private constructor(){}

    public static getInstance(){
        if(!Database.instance){
            Database.instance = mysql.createPool({
                host: 'localhost',
                user: 'root',
                password: '',
                database: 'node-ts-mysql-app'
            })
        }
        return Database.instance;
    }
}

export default Database;