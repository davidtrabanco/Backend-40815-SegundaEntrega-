import FileManager from "./fileManager.js"

export default class ArrayManager{
    constructor(dbFile, array){
        this.bufferTable= (array) ? array : [];
        this.dbFile = (dbFile) ? new FileManager(dbFile) : null;
        this.getBufferTable();
    };
    
    getBufferTable= async()=>{
        if(this.dbFile){
            this.bufferTable = await this.dbFile.read()
            await this.recoverSubArrays();
        }       
    };

    //Si leo un subArray desde un JSON, lo busco y le asigno nuevamente los metodos
    recoverSubArrays = async() =>{
        this.bufferTable.map( record =>{
            for (const item in record) {
                if(typeof record[item] === 'object'){
                    record[item] = new ArrayManager(null,record[item].bufferTable)
                }
            }       
        } )
    }

    saveToFile = async ()=>{
        if(this.dbFile){
            await this.dbFile.save(this.bufferTable);
        }
    };

    getNewId = () =>{ 
        let newId = 0; //Id inicial
        //Si ya exiten datos en la tabla:
        if( this.bufferTable.length != 0){
            newId = this.bufferTable[this.bufferTable.length - 1].id + 1;
        } 
        return newId;
    };

    get = async (id)=>{
        //Si tengo un ID lo busco y retorno ese objecto
        if(id != undefined){
            const objectFound = await this.bufferTable.filter( object => object.id == id )
            return await objectFound[0];
        };
        //Si no tengo ID retorno todos los productos:
        return this.bufferTable;
    };

    add = async (newObject)=>{
        //Agrego el Id:
        newObject.id = this.getNewId();

        //Agrego el timestamp:
        newObject.timestamp = Date.now();
        
        //Agrego el objecto nuevo a la tabla:
        this.bufferTable.push( newObject );

        //Guardo en archivo:
        await this.saveToFile();

        return newObject.id;
   };

   update = async (id, modifedObject)=>{
       //modifico el objecto:
       this.bufferTable.map( object => {
           if(object.id == id){
               //creo un array con los Keys del objecto enviado:
               const keys = Object.keys(modifedObject)
               //actualizo solo los Keys enviados:
               keys.forEach(key => { object[key] = modifedObject[key] });
           }
       });

       //Guardo los cambios:
       await this.saveToFile();
   }

   delete = async (id) =>{
       //Filtro el ID a eliminar
       this.bufferTable = this.bufferTable.filter( object => object.id != id );

       ///Guardo los cambios:
       await this.saveToFile();
   }

   addSubArray = async ( mainArrayId, subArrayName )=>{
        //primero obtengo el registro:
        const record = await this.get(mainArrayId);

        //Creo el sub array:
        const subArray = {}
        subArray[subArrayName] = new ArrayManager;
        
        //Agrego el objecto con el nuevo array al registro:
        Object.assign(record, subArray)

        //Guardo el cambio
        await this.update( mainArrayId, record)
   }

};
