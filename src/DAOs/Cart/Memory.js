import ArrayManager from "../../Containers/ArrayManager.js";

class CartsDao extends ArrayManager{
    constructor(){
        super()
    }

    createCart = async ()=>{
        const cartId = await this.add({});
        await this.addSubArray( cartId, "products" )
        return cartId;
    }

    deleteCart = async (cartId) =>{
        await this.delete(cartId);
    }

    getProducts = async (cartId) =>{
        const cart = await this.get(cartId);
        return await cart.products.get();
    }

    addProduct = async (cartId, ProductId) =>{
        let {productsCtrl} = await import("../../Controller/index.js")
        //Obtengo el producto:
        const newProduct = await productsCtrl.getInternal(ProductId);
        //Obtengo el carrito:
        let cartTemp = await this.get(cartId);
        //Agrego el producto
        cartTemp.products.add(newProduct)
        //Actualizo el carrito
        await this.update(cartId, cartTemp)

        return newProduct;
    }

    deleteProduct = async (cartId, ProductId) =>{
        //Obtengo el carrito:
        let cartTemp = await this.get(cartId);

        //Filtro eliminando el producto:
        cartTemp.products.delete(ProductId);

        //Actualizo el carrito
        this.update(cartId, cartTemp);
    }

  
}

export default CartsDao;
