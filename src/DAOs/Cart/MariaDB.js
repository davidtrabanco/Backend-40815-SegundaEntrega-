import knex from "knex";
import config from "../../config/config.js";
import SQLManager from "../../models/SQLManager.js";

//Defino la esquema de la tabla:
const tableSchema = (table) => {
    table.increments('id').primary();
    table.timestamp('created_at');
    table.longtext('products');
}

//Defino la conexion
const dbConnection = knex(config.DataBases.MariaDB);

//Defino la tabla:
const tableName = 'carts'

//Defino la nueva clase ProductsDao
class CartsDao extends SQLManager{
    constructor(){
        super(dbConnection, tableName, tableSchema)
    }

    createCart = async ()=>{
        return await this.insertRecord({ products : "[]" });
    }

    deleteCart = async (cartId) =>{
        await this.deleteFilterRecords( 'id', '=', cartId);
    }

    getProducts = async (cartId) =>{
        const cart = await this.retrieveFilterRecords( 'id', '=', cartId );
        return JSON.parse(cart[0].products);
    }

    addProduct = async (cartId, ProductId) =>{
        //Obtengo el producto:
        let {productsCtrl} = await import("../../controllers/index.js")
        const product = await productsCtrl.getInternal(ProductId);

        //elimino el campo _id del producto
        const newProduct = {}
        const keys = Object.keys(product[0])
        //actualizo solo los Keys enviados:
        keys.forEach(key => { 
            if(key != '_id'){newProduct[key] = product[0][key]}
        });
            
        //Obtengo el carrito:
        let cart = await this.retrieveFilterRecords( 'id', '=', cartId);

        let cartJSON = JSON.parse( cart[0].products );

        //Agrego el producto
        cartJSON.push(newProduct);

        let newProductList = { products : JSON.stringify(cartJSON) }

        //Actualizo el carrito
        await this.updateRedord( newProductList, 'id', '=', cartId );

        return newProduct;
    }

    deleteProduct = async (cartId, ProductId) =>{
        //Obtengo el carrito:
        let cart = await this.retrieveFilterRecords( 'id', '=', cartId);
        let cartJSON = JSON.parse( cart[0].products );

        //Elimino el producto
        cartJSON = cartJSON.filter( product => product.id != ProductId );

        //Actualizo el carrito
        let newProductList = { products : JSON.stringify(cartJSON) }

        //Actualizo el carrito
        await this.updateRedord( newProductList, 'id', '=', cartId );
    }
}

export default CartsDao;
