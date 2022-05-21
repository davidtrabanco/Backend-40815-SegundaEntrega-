import FirebaseManager from "../../Containers/FirebaseManager.js";
import config from "../../../config.js";

const credential = `./${config.DataBases.Firebase.credential}`;

class ProductsDao extends FirebaseManager{
    constructor(){
        super(credential, 'products')
    }

    get = async ( id )=>{
        if(id){ return await this.getDoc(id) }
        return await this.getDocs();
    }

    add = async ( newDoc ) =>{
        return await this.createDoc( newDoc );
    }

    update = async ( id, modifedDoc ) =>{
        return await this.updateDoc(id, modifedDoc);
    }

    delete = async (id) => {
        return await this.deleteDoc(id);
    }
}

export default ProductsDao;