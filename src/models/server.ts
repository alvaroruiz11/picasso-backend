import express, { Application } from 'express';
import cors from 'cors'

import db from '../database/connection';
import { usersRouter, authRouter, clientsRouter } from '../routes';


class Server {
    
    private app: Application;
    private port:string;

    private path = {
        auth: '/api/auth',
        clients: '/api/clients',
        user: '/api/users',
    };

    constructor() {

        this.app = express();
        this.port = process.env.PORT || '3000';

        this.dbConnection();

        this.middlewares();

        this.routes();
    }

    private async dbConnection() {
        try {
            
            await db.authenticate();
            console.log('Database online');

        } catch (error) {
            console.log( error );
            throw new Error('Error connection');
        }
    }

    private middlewares() {
        
        this.app.use( cors() );

        this.app.use( express.json() );

        this.app.use( express.static('public') );
    }

    private routes() {
        this.app.use( this.path.auth, authRouter );
        this.app.use( this.path.clients, clientsRouter );
        this.app.use( this.path.user, usersRouter );
    }


    listen() {
        this.app.listen( this.port, () => {
            console.log(`Server port ${ this.port }`);
        });
    }
}


export default Server;