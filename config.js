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
            password: '74108520',
            database: 'ecommerce',
        },

        Firebase:{
            credential: 'ecommerce-76c3e-firebase-adminsdk-jm63v-3d754efeb2.json'
        }

    },

}