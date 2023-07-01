import { Request, Response } from 'express';
import bcryptjs from 'bcryptjs';
import { User } from '../models';
import { generateJWT } from '../helpers';

export const login = async ( req: Request, res: Response ) => {


    const { email, password } = req.body;

    try {
        
        const user = await User.findOne({
            where: {
                email
            }
        });

        if( !user ) {
            return res.status( 400 ).json({
                msg: `Correo electrónico incorrecto`
            });
        }

        const validatePassword = bcryptjs.compareSync( password, user.password );

        if( !validatePassword ) {
            return res.status( 400 ).json({
                msg: `Contraseña incorrecta`
            });
        }

        const token = await generateJWT( user.id );

        res.json({
            user,
            token
        });


    } catch (error) {
        console.log( error );
        res.status( 500 ).json({
            msg: 'Hable con el administrador'
        })
    }
    
}


export const revalidateToke = async ( req:Request | any, res: Response ) => {

    const user = req.user;

    const token = await generateJWT( user.id );

    res.json({
        user,
        token
    })
    

}