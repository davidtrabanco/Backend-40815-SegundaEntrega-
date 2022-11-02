import mongoose from "mongoose";

export default class MongoDBManager{

    constructor(urlConnection, collection, tableSchema){
        this.urlConnection = urlConnection;
        this.schema = new mongoose.Schema(tableSchema);
        this.model = mongoose.model(collection, this.schema);;
        this.connect();
    }

    connect = async () =>{
        try {
            await mongoose.connect(this.urlConnection);
            console.log("mongoDB Connected");
        } catch (error) {
            console.error(`Error on connection: ${error}`);
        }
    }

    disconnect = async () =>{
        try {
            return await mongoose.disconnect();
        } catch (error) {
            console.error(`Error on disconnection: ${error}`);
        }
    }

    getDocuments = async ( field, value, arrayShownFields)=>{
        const filter = {};
        const showFields = {}; 
        //Creo el filtro
        if(field != undefined && value != undefined){
            filter[field] = value;
        }

        //Creo el objecto con los campos a mostrar:
        if( arrayShownFields != undefined){
        arrayShownFields.map( field =>{
            showFields[field] = 1
        })}

        //Resulevo:
        try {
            return await this.model.find( filter, showFields)
        } catch (error) {
            console.error(`Error to try get documents: ${error}`);
        }
    }

    addDocument = async ( document )=>{
        try {
            const newID = await this.model( document ).save();
            return newID._id;
        } catch (error) {
            console.error(`Error to try add documents: ${error}`);
        }
    }

    updateDocument = async (id, modifedDoc) =>{
        try {
            return this.model.updateOne({_id: id},modifedDoc);
        } catch (error) {
            console.error(`Error to update document: ${error}`);
        }
    }

    addDocuments = async ( documents )=>{
        try {
            const toInsert = [];
            toInsert.push( this.model.create(documents) );
            const results = await Promise.allSettled( toInsert );
            return results;
        } catch (error) {
            console.error(`Error to add documents: ${error}`);
        }
    }

    deleteDocument = async (id) =>{
        try {
            return await this.model.deleteOne( {_id : id} )
        } catch (error) {
            console.error(`Error to delete document: ${error}`);
        }
    }

    deleteDocuments = async (id) =>{
        try {
            return await this.model.deleteMany( {_id : id} );
        } catch (error) {
            console.error(`Error to delete document: ${error}`);
        }
    }
   
}

