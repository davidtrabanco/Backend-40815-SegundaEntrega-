
import firebase from "firebase-admin";


export default class  FirebaseManager{

    constructor ( credential, collection){
        this.credential = credential;
        this.collection = collection;
        this.query = null;
        this.connect()
    }

    connect = async () =>{
        //si no esta inicializada:
        if(firebase.apps.length === 0){
            await firebase.initializeApp( {credential: firebase.credential.cert(this.credential)} ); 
            console.log('Firebase DB Connected');
        } 
        //configuro la coleccion query
        const database = await firebase.firestore();
        this.query = database.collection(this.collection);
    }

    formatDoc = ( doc ) =>{
        let object = doc.data();
        object.id = doc.id;
        return object;   
    }

    getDocs = async () =>{
        try {
            //const docs = await (await this.query.get()).docs;
            const querySnapshot = await this.query.get()
            const docs = querySnapshot.docs;
            return docs.map( doc => this.formatDoc(doc) )

        } catch (error) {
            console.error(`Error to get docs ${error}`);
        }
    }

    getDoc = async (id) =>{
        try {
            const docFound = await this.query.doc(id).get();
            return this.formatDoc( docFound );

        } catch (error) {
            console.error(`Error to get doc ${error}`);
        }
    }

    createDoc = async ( document )=>{
        try {
            let newDoc = this.query.doc();
            await newDoc.create( document );
            return newDoc.id;
        } catch (error) {
            console.error(`Error to create a doc ${error}`);
        }
    }

    creatSubcollection = async (mainDocId, subcollectionName) => {
        return await this.query.doc(mainDocId).collection(subcollectionName).doc().set();
    }

    updateDoc = async (id, modifedDoc) =>{
        try {
            const doc = this.query.doc(id);
            return await doc.update( modifedDoc )

        } catch (error) {
            console.error(`Error to update doc ${error}`);
        }
    }

    deleteDoc = async ( id ) =>{
        try {
            const doc = this.query.doc(id);
            return await doc.delete()
        } catch (error) {
            console.error(`Error to delete doc ${error}`);
        }
    }
}







const CRUD = async ()=>{


    try {
        let querySnapshot = await query.where('DNI', '<', 30000000).get();
        let docs = querySnapshot.docs;

        docs.map(doc =>{
            console.log(
                {
                    Id: doc.id,
                    Nombre: doc.data().nombre,
                    DNI: doc.data().DNI
                }
                );
        })

        
    } catch (error) {
        console.error(error);
    }
}