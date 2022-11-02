import knex from "knex";
import config from "../../config/config.js";
import SQLManager from "../../models/SQLManager.js";

//Defino la esquema de la tabla:
const tableSchema = (table) => {
    table.increments('id').primary();
    table.string('title', 50).notNullable();
    table.string('description', 256).notNullable();
    table.float('price');
    table.string('picUrl', 256);
    table.float('stock').notNullable();
}

//Defino la conexion
const dbConnection = knex(config.DataBases.MariaDB);

//Defino la tabla:
const tableName = 'products'

//Defino la nueva clase ProductsDao
class ProductsDao extends SQLManager{
    constructor(){
        super(dbConnection, tableName, tableSchema)
    }
    get = async(id)=>{
        if(id){
            return await this.retrieveFilterRecords("id", "=", id);
        }
        return await this.retrieveAllRecords();
    }

    add = async ( object ) =>{
        return await this.insertRecord( object );
    }

    update = async ( id, modifedObject) => {
        return await this.updateRedord(modifedObject, "id", "=", id);
    }

    delete = async (id) =>{
        return await this.deleteFilterRecords("id", "=", id);
    }
}

export default ProductsDao;



