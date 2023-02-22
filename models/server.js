//Configuración del server
//Importaciones básicas
const express = require('express');
const cors = require('cors');
const { dbConection } = require('../database/config');

class Server {

    constructor(){
        //Variables de configuración
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            auth: '/api/auth',
            usuario: '/api/alumnos',
            curso: '/api/cursos',
        }

        //Conectar a base de datos
        this.conectarDB();

        //Middlewares
        this.middlewares();
        
        //Rutas de mi app
        this.routes();
    }


    //Metodo de conección a Mongo
    async conectarDB(){
        await dbConection();
    }

    
    middlewares(){

        //CORS
        this.app.use( cors() );

        //Lectura y parseo del body
        this.app.use( express.json() );

        //Directorio publico del proyecto
        this.app.use(  express.static('public') );

    }


    routes(){
        this.app.use( this.paths.auth, require('../routes/auth'));
        this.app.use( this.paths.usuario, require('../routes/alumno'));
        this.app.use(this.paths.curso, require('../routes/curso'));
    }


    listen(){
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en puerto ${this.port}`)
        })
    }


}


module.exports = Server;