import 'dotenv/config'

let persistenceMethod = process.env.PERSISTENCE;

//PRODUCTOS
export const productsDAO =  ()=>{
    return new Promise(async (resolve, reject) => {
        const { default: ProductsDao } = await import(`./Products/${persistenceMethod}.js`)
        const productsDAO = new ProductsDao();
        resolve(productsDAO);

    });
}

//CARRITO
export const cartDAO =  ()=>{
    return new Promise(async (resolve, reject) => {
        const { default: CartsDao } = await import(`./Cart/${persistenceMethod}.js`)
        const cartDAO = new CartsDao();
        resolve(cartDAO);

    });
}






