import {Router} from "express";
import {checkUserPrivileges} from "./Middleware/userPrivileges.js";
const {productsCtrl} = await import("../Controller/index.js")

//Declaro el router Productos:
export const productsRoute = Router();

//Valido que el usuario tenga privilegios antes de seguir:
productsRoute.use(checkUserPrivileges);

//GET: '/:id?' - Me permite listar todos los productos disponibles ó un producto por su id (disponible para usuarios y administradores)
productsRoute.get('/', productsCtrl.get);
productsRoute.get('/:id', productsCtrl.get);

//POST: '/' - Para incorporar productos al listado (disponible para administradores)
productsRoute.post('/', productsCtrl.post);

//PUT: '/:id' - Actualiza un producto por su id (disponible para administradores)
productsRoute.put('/:id', productsCtrl.put);

//DELETE: '/:id' - Borra un producto por su id (disponible para administradores)
productsRoute.delete('/:id', productsCtrl.delete);