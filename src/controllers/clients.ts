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
        
        const existCedula = await Client.findOne({
            where: {
                cedula
            }
        })

        
        if( existCedula ) {
            return res.status( 400 ).json({
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
export const updateClient = async ( req: Request, res: Response ) => {

    const { id } = req.params;

    const { status, id:idClient, ...body } = req.body;

    try {
        

        const existCedula = await Client.findOne({
            where: {
                cedula: body.cedula
            }
        })

        
        if( existCedula ) {
            return res.status( 400 ).json({
                msg: `Ya existe la cedula ${ body.cedula }`
            })
        }

        const client = await Client.findByPk( id );
        
        await client?.update( body );
        


    } catch (error) {
        
    }

}
export const deleteClient = async ( req: Request, res: Response ) => {

    const { id } = req.params;

    try {
        
        const client = await Client.findByPk( id );

        await client?.update({ status: 0 });

        res.json( client );

    } catch (error) {
        console.log( error );
        res.status( 500 ).json({
            msg: 'Hable con el administrador'
        });
    }

}