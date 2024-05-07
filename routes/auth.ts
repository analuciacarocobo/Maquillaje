import express from "express";
import authController from '../controllers/auth-controller';
import verifyToken from '../middleware/verifyToken'; 
const router = express.Router();


router.post('/', authController);
router.post('/', verifyToken, authController);


export default router;
