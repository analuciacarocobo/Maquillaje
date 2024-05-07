import { Request, Response } from "express";
import UserRepository from '../repositories/UserRepository';
import generateToken from '../Helpers/generateToken';

const authenticateUser = async (req: Request, res: Response) => {
  try {
    
    const { email, password } = req.body;

   
    const user = await UserRepository.findByEmail(email);

    
    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const isPasswordValid = await UserRepository.comparePassword(password, user.password);

  
    if (isPasswordValid) {
     
      const token = generateToken({ userId: user.id }, process.env.KEY_TOKEN, 60); 
      
     
      return res.status(200).json({ token });
    } else {
      
      return res.status(401).json({ message: "Invalid username or password" });
    }
  } catch (error) {
    
    console.error("Error during authentication:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export default authenticateUser;
