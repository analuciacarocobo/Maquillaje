import ProductRepository from '../repositories/ProductRepository'; 
import Product from '../Dto/ProductDto'; 

class ProductService {
    static async register(productData: any) {
        try {
           
            const product = new Product(productData.name, productData.description, productData.price,);
            
           
            const savedProduct = await ProductRepository.add(product);
            
            
            return savedProduct;
        } catch (error) {
          
            throw new Error('Error al registrar el producto.');
        }
    }
}

export default ProductService;
