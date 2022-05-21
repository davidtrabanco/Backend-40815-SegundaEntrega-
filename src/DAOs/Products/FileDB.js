import ArrayManager from "../../Containers/ArrayManager.js";

class ProductsDao extends ArrayManager{
    constructor(){
        super('products.json')
    }
}

export default ProductsDao;