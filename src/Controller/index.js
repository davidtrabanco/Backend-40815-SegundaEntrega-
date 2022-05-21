import HttpMethods from "./httpMethodsTemp.js";
import HttpCartMethods from "./httpCartMethodsTemp.js";
import {productsDAO, cartDAO} from "../DAOs/index.js";

//Productos:
export const productsCtrl = new HttpMethods(await productsDAO());

//Carrito:
export const cartCtrl = new HttpCartMethods(await cartDAO());

