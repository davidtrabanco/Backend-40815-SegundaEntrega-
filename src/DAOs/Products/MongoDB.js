import MongoDBManager from "../../models/mongoDBManager.js";
import config from "../../config/config.js";

export const schema = {
    title: {type: String, required: true, max: 256},
    description: {type: String, required: true, max: 256},
    price: {type: Number, required:true},
    picUrl:{type: String, required:true, max:256},
    stock: {type: Number, required:true}
}

const urlConnection = `mongodb+srv://${config.DataBases.MongoDB.usuario}:${config.DataBases.MongoDB.password}
@cluster0.zbawm.mongodb.net/${config.DataBases.MongoDB.database}`;

const collection = 'products';

class ProductsDao extends MongoDBManager{

    constructor(){
        super(urlConnection, collection, schema)
    }

    get = async(id)=>{
        return await this.getDocuments( '_id', id )
    }

    add = async ( object ) =>{
        return await this.addDocument( object );
    }

    update = async ( id, modifedObject) => {
        return await this.updateDocument(id, modifedObject);
    }

    delete = async (id) =>{
       return await this.deleteDocument( id );
    }
}

export default ProductsDao;