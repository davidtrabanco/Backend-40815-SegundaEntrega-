import FirebaseManager from "../../Containers/FirebaseManager.js";
import config from "../../../config.js";

const credential = `./${config.DataBases.Firebase.credential}`;

class CartsDao extends FirebaseManager{
    constructor(){
        super(credential, 'carts')
    }

    createCart = async ()=>{
        return await this.createDoc( { products: [] } );
    }

    deleteCart = async (cartId) =>{
        await this.deleteDoc(cartId);
    }

    getProducts = async (cartId) =>{
        const cart = await this.getDoc( cartId )
        return cart.products
    }

    addProduct = async (cartId, ProductId) =>{
        //Obtengo el producto:
        let {productsCtrl} = await import("../../Controller/index.js")
        const product = await productsCtrl.getInternal(ProductId);
            
        //Obtengo el carrito:
        let cart = await this.getDoc( cartId );

        //Agrego el producto
        cart.products.push(product);

        //Actualizo el carrito
        await this.updateDoc( cartId, cart)

        return product;
    }

    deleteProduct = async (cartId, ProductId) =>{
        //Obtengo el carrito:
        let cart = await this.getDoc( cartId );

        //Elimino el producto
        cart.products = cart.products.filter( product => product.id != ProductId );

        //Actualizo el carrito
        await await this.updateDoc( cartId, cart)
    }
}

export default CartsDao;