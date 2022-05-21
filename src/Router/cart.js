import {Router} from "express";
const {cartCtrl} = await import("../Controller/index.js")
export const cartRoute = Router();


// POST: '/' - Crea un carrito y devuelve su id.
cartRoute.post('/', cartCtrl.postCart)

// DELETE: '/:id' - Vacía un carrito y lo elimina.
cartRoute.delete('/:id', cartCtrl.deleteCart)

// GET: '/:id/productos' - Me permite listar todos los productos guardados en el carrito
cartRoute.get('/:id/productos', cartCtrl.getProducts)

// // POST: '/:id/productos' - Para incorporar productos al carrito por su id de producto
cartRoute.post('/:id/productos/:id_prod', cartCtrl.postProduct)

// // DELETE: '/:id/productos/:id_prod' - Eliminar un producto del carrito por su id de carrito y de producto
cartRoute.delete('/:id/productos/:id_prod', cartCtrl.deleteProduct)