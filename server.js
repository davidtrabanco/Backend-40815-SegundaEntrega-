import express from "express";
import {productsRoute} from "./src/router/products.js";
import {cartRoute} from "./src/router/cart.js";
import dotenv from "dotenv";

//Configuro variables de entorno
if (process.env.NODE_ENV !== 'production'){
    dotenv.config();
}

const app = express();

//Configuro el servidor:
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Configuro la carpeta estatica/publica:
app.use(express.static('./public'));

//Configuro las rutas:
app.use('/api/productos', productsRoute);
app.use('/api/carrito', cartRoute);
//Si la ruta no existe:
app.use('*', (req,res)=>{
    res.send({ 
        error : -2, 
        descripcion:` ruta ${req.baseUrl} método ${req.method} no implementada`})
})

//Ejecuto el servidor:
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT,()=>console.log(`server up on port ${server.address().port}`))
server.on('error', err => console.error(err))

