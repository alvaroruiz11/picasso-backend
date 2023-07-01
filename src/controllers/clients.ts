import { Request, Response } from 'express';
import validator from 'validator';

import { Client } from '../models';
import { ClientInstance } from '../models/client';



export const getClients = async ( _req: Request, res: Response ) => {

    try {
        const clients = await Client.findAll({
            where: {
                status: 1
            }
        });
    
        res.json( clients );
        
    } catch (error) {
        console.log( error );
        res.status( 500 ).json({
            msg: 'Hable con el administrador'
        });
    }


}
export const getClientByTerm = async ( req: Request, res: Response ) => {

    const { term } = req.params;

    let client;
    
    try {
        
        if ( validator.isUUID( term )) {
            client = await Client.findByPk( term );
        }else {
            client = await Client.findOne({
                where: {
                    cedula: term
                }
            });
        }
        
        res.json( client );


    } catch (error) {
        console.log( error );
        res.status( 500 ).json({
            msg: 'Hable con el administrador'
        });
    }

}
export const createClient = async ( req: Request, res: Response ) => {

    const { cedula, firstName, lastName, addres, phone } = req.body;

    try {
        
        const isExistCedula = await Client.findOne({
            where: {
                cedula
            }
        });

        if( isExistCedula ) {
            return res.json( 400 ).json({
                msg: `Ya existe la cedula ${ cedula }`
            })
        }
        const client = Client.build({ cedula, firstName, lastName, addres, phone} as ClientInstance );

        await client.save();

        res.json( client );

    } catch (error) {
        console.log( error );
        res.status( 500 ).json({
            msg: 'Hable con el administrador'
        });
    }

}
export const updateClient = ( _req: Request, res: Response ) => {

    res.json('updateClient');

}
export const deleteClient = ( _req: Request, res: Response ) => {

    res.json('deleteClient');

}