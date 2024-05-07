class Product {
    private _name: string;
    private _description: string;
    private _price: number;
  

    constructor(
        name: string,
        description: string,
        price: number,
       
    ) {
        this._name = name;
        this._description = description;
        this._price = price;
        
    }

    
    get name(): string {
        return this._name;
    }

    set name(name: string) {
        this._name = name;
    }

   
    get description(): string {
        return this._description;
    }

    set description(description: string) {
        this._description = description;
    }

   
    get price(): number {
        return this._price;
    }

    set price(price: number) {
        this._price = price;
    }
}


export default Product;