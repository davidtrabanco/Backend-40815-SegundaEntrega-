export default{
    fileSystem: {
        path : "./DB/"
    },

    DataBases:{
        MariaDB: {
            client: 'mysql',
            connection: {
                host: '127.0.0.1',
                user: 'root',
                password: '',
                database: 'ecommerce'},
            pool: { min: 0, max: 10 }
            },

        MongoDB:{
            usuario: 'davidtrabanco',
            password: 'coder1234',
            database: 'ecommerce',
        },

        Firebase:{
            credential: 'ecommerce-2b72e-firebase-adminsdk-4mbsp-b4001520d0.json'
        }

    },

}