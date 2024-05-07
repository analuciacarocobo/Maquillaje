import { Request, Response, NextFunction } from 'express';
import jwt, { Secret } from 'jsonwebtoken';

interface CustomRequest extends Request {
    users?: any; 
}

const verifyToken = (req: CustomRequest, res: Response, next: NextFunction) => {
  const token = req.header('Authorization');

  if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });

  try {
    const decoded = jwt.verify(token, process.env.KEY_TOKEN as Secret); 
    req.users = decoded;
    next();
  } catch (error) {
    res.status(400).json({ message: 'Invalid token.' });
  }
};

export default verifyToken;
