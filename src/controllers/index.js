import HttpMethods from "../models/httpMethods.js";
import HttpCartMethods from "../models/httpCartMethods.js";

import {productsDAO, cartDAO} from "../DAOs/index.js";

//Productos:
export const productsCtrl = new HttpMethods(await productsDAO());

//Carrito:
export const cartCtrl = new HttpCartMethods(await cartDAO());

