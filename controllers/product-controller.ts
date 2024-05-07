import { Request, Response } from "express";
import Product from '../Dto/ProductDto';
import ProductService from '../services/ProductService';

let registerProduct = async (req: Request, res: Response) => {
  try {
    const {
      name,
      description,
      price,
    } = req.body;
    const registerProduct = await ProductService.register(new Product(name, description, price, /* Otros campos */))
    return res.status(201).send(
      { status: 'Product registered successfully' }
    );
  } catch (error: any) {
  
  }
}

export default registerProduct;