import fs from "fs";
import config from "../../config.js";

export default class FileManager{
    constructor(fileName){
        this.path = config.fileSystem.path + fileName;
    }
    
    async read(){
        try {
            //leo archivo actual y Lo convierto en Array:
            const dataTxt = await fs.promises.readFile(this.path,'utf-8');
            const data = JSON.parse(dataTxt);
            return data;

        } catch (error) {
            console.error(error);
        }
    };

    async save(object){
        try {
            //Guardo el Array en el archivo:
            const objectTxt = JSON.stringify(object);
            await fs.promises.writeFile(this.path , objectTxt)

        } catch (error) {
            console.error(error);
        } 
    }
};