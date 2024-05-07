import db from '../config/config-db';
import Product from '../Dto/ProductDto';

class ProductRepository {
    static async add(product: Product) {
        try {
         
            const sql = 'INSERT INTO products (name, description, price) VALUES (?, ?, ?)';
            const values = [product.name, product.description, product.price];

           
            const result = await db.execute(sql, values);
            
            
            if (Array.isArray(result) && result.length > 0 && 'insertId' in result[0]) {
                const insertId = result[0].insertId;
                return insertId;
            } else {
                
                throw new Error('No se pudo obtener el ID del producto insertado.');
            }
        } catch (error) {
            
            throw new Error('Error al agregar el producto.');
        }
    }
}

export default ProductRepository;
