import MongoDBManager from "../../Containers/mongoDBManager.js";
import config from "../../../config.js";
import {schema as productSchema} from "../Products/MongoDB.js";


const schema = { 
    products: [ productSchema ],
    timestamp : { type : Date, default: Date.now }
};

const urlConnection = `mongodb+srv://${config.DataBases.MongoDB.usuario}:${config.DataBases.MongoDB.password}
@cluster0.zbawm.mongodb.net/${config.DataBases.MongoDB.database}`;

const collection = 'carts';

class CartsDao extends MongoDBManager{

    constructor(){
        super(urlConnection, collection, schema)
    }

    createCart = async ()=>{
        return await this.addDocument( );
    }

    deleteCart = async (cartId) =>{
        await this.deleteDocument(cartId);
    }

    getProducts = async (cartId) =>{
        const products = await this.getDocuments(  '_id', cartId, ['products'] );
        return products[0].products;
    }

    addProduct = async (cartId, ProductId) =>{
        //Obtengo el producto:
        let {productsCtrl} = await import("../../Controller/index.js")
        const product = await productsCtrl.getInternal(ProductId);

        //elimino el campo _id del producto
        const newProduct = {}
        const keys = Object.keys(product[0])
        //actualizo solo los Keys enviados:
        keys.forEach(key => { 
            if(key != '_id'){newProduct[key] = product[0][key]}
        });
            
        //Obtengo el carrito:
        let cartProducts = await this.getDocuments(  '_id', cartId, ['products'] )

        //Agrego el producto
        cartProducts[0].products.push(newProduct);

        //Actualizo el carrito
        await this.updateDocument(cartId, cartProducts[0]);

        return newProduct;
        
    }

    deleteProduct = async (cartId, ProductId) =>{
        //Obtengo el carrito:
        let cartProducts = await this.getDocuments('_id', cartId, ['products'] )

        //Elimino el producto
        cartProducts[0].products = cartProducts[0].products.filter( product => product._id != ProductId );

        //Actualizo el carrito
        await this.updateDocument(cartId, cartProducts[0]);
    }
}

export default CartsDao;