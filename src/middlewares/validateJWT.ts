import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

import { User } from '../models';

export const validateJWT = async ( req:Request | any, res:Response, next: NextFunction ) => {

    const token = req.header('x-token');

    if( !token ) {
        return res.status( 400 ).json({
            msg: 'No hay token en la petición'
        })
    }

    try {

        const { id } = jwt.verify( token, process.env.SECRETORPRIVATEKEY! ) as JwtPayload;

        const user = await User.findByPk( id );

        if( !user ) {
            return res.status( 401 ).json({
                msg: 'Token no valido - Usuario no se encuetra registrado en DB'
            })
        }

        if( user.status === 0 ) {
            return res.status( 401 ).json({
                msg: 'Token no valido - Usuario descativado'
            })
        }

        req.user = {
            id: user.id,
            name: user.name,
            email: user.email,
        };


        next();

    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no valido'
        });
    }



}