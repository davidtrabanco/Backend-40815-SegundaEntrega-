
export default class HttpCartMethods{
    constructor(table){
        this.table = table;
    }

    //Crea un carrito y devuelve su id.
    postCart = async (req, res) =>{
        const newId = await this.table.createCart();
        res.send(`New cart was created with ID: ${newId}`)
    } 

    //Vacía un carrito y lo elimina.
    deleteCart = (req, res)=>{
        const cartId = req.params.id;
        this.table.deleteCart(cartId);
        res.send("cart deleted")
    }

    //Me permite listar todos los productos guardados en el carrito
    getProducts = async (req, res)=>{
        const cartId = req.params.id;
        const products = await this.table.getProducts(cartId);
        res.send(products)
    }

    //Para incorporar productos al carrito por su id de producto
    postProduct = async (req, res)=>{
        const cartId = req.params.id;
        const productId = req.params.id_prod;

        const productAdded = await this.table.addProduct(cartId, productId)
        res.send(`Product added: ${JSON.stringify(productAdded)}`)
    }

    // //Eliminar un producto del carrito por su id de carrito y de producto
    deleteProduct = async (req, res)=>{
        const cartId = req.params.id;
        const productId = req.params.id_prod;

        await this.table.deleteProduct(cartId, productId);

        res.send("Product deleted")
    }

}




