import db from '../config/config-db';
import User from '../Dto/UserDto';
import Auth from '../Dto/AuthDto';
import bcrypt from 'bcryptjs';
import { RowDataPacket } from 'mysql2';


class UserRepository {

    static async add(user: User){
        const sql = 'INSERT INTO users (email, nombres, apellidos, telefono, password) VALUES (?, ?, ?, ?, ?)';
        const values = [user.email, user.nombres, user.apellidos, user.telefono, user.password];
        return db.execute(sql, values);
    }

    static async login(auth: Auth){
        const sql = 'SELECT password FROM users WHERE email=?';
        const values = [auth.email];
        const result: any = await db.execute(sql, values);
        if (result[0].length > 0){
          const isPasswordValid = await bcrypt.compare(auth.password, result[0][0].password);
          if (isPasswordValid){
            return {logged: true, status: "Successful authentication"}
          }
          
        }
        return {logged: false, status: "Invalid username or password" };
    }
    
    static async findByEmail(email: string) {
        try {
            const sql = 'SELECT * FROM users WHERE email = ?';
            const values = [email];
            const [rows] = await db.execute(sql, values);
            if (Array.isArray(rows) && rows.length > 0) {
              const user = rows[0] as RowDataPacket 
              return new User(user.email, user.nombres, user.apellidos, user.telefono, user.password);
            }
          return null;
          
        } catch (error) {
            
            throw new Error('Error while fetching user by email.');
        }
    }

    static async comparePassword(plainPassword: string, hashedPassword: string) {
        return await bcrypt.compare(plainPassword, hashedPassword);
    }
}

export default UserRepository;
