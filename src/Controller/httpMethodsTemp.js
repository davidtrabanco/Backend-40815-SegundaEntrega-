export default class HttpMethods{
    constructor(tableTemplate) {
        this.table = tableTemplate;
    }

    get = async (req, res) => {
        const id = req.params.id;
        const response = await this.table.get(id);
        res.send( response );
    };

    post = async (req, res) => {
        const newObject = req.body;
        const newId = await this.table.add(newObject);
        res.send(`New object was created with ID:${newId} `);
    };

    put = async (req, res) =>{
        const id = req.params.id;
        const modifedObject = req.body;
        await this.table.update(id, modifedObject);
        res.send(`Object Updated`);
    }

    delete = (req, res) => {
        const id = req.params.id;
        this.table.delete(id);
        res.send(`Object deleted`);
    }

    getInternal = async (id) => {
        return JSON.parse( JSON.stringify( await this.table.get( id) ) )
    }; 
}