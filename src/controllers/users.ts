import { Request, Response } from 'express';
import bcryptjs from 'bcryptjs';
import User, { UserInstance } from '../models/user';



export const getUsers = async ( _req: Request, res: Response ) => {
    try {
        const users = await User.findAll({
            where: {
                status: 1
            },
        });
        res.json( users );
    } catch (error) {
        console.log( error );
        res.status( 500 ).json({
            msg: 'Hable con el administrador'
        });
    }
}
export const getUserById = async ( req: Request, res: Response ) => {
    
    const { id } = req.params;

    try {
        
        const user = await User.findByPk( id );

        if( !user ) {
            return res.status( 404 ).json({
                msg: `No existe un usuario con el ID ${ id }`
            });
        }

        res.json( user );

    } catch (error) {
        console.log( error );
        res.status( 500 ).json({
            msg: 'Hable con el administrador'
        });
    }


}
export const createUser = async ( req: Request, res: Response ) => {
    
    const { name, email, password } = req.body;

    try {
        
        const existEmail = await User.findOne({
            where: {
                email
            }
        });


        if( existEmail ) {
           return res.status( 400 ).json({
                msg: `Ya existe un usuario con el email ${ email }`
            });
        }


        const user = User.build({ name, email, password } as UserInstance );

        const salt = bcryptjs.genSaltSync();

        user.password = bcryptjs.hashSync( password, salt );

        await user.save();

        // TODO - generar token?

        res.json( user );

    } catch (error) {
        console.log( error );
        res.status( 500 ).json({
            msg: 'Hable con el administrador'
        });
    }


}
export const updateUser = async ( req: Request, res: Response ) => {
    const { id } = req.params;
    const { email, id:idBody, ...body } = req.body;

    try {
        
        const user = await User.findByPk( id );
        if( !user ) {
            return res.status( 404 ).json({
                msg: `No existe un usuario con el id ${ id }`
            })
        }

        if( body.password ){
            const salt = bcryptjs.genSaltSync();
            body.password = bcryptjs.hashSync( body.password, salt );
        }

        await user.update( body );

        res.json( user );

    } catch (error) {
        console.log( error );
        res.status( 500 ).json({
            msg: 'Hable con el administrador'
        });
    }

}
export const deleteUser = async ( req: Request, res: Response ) => {

    const { id } = req.params;

    try {

        const user = await User.findByPk( id );
        if( !user ) {
            return res.status( 404 ).json({
                msg: `No existe un usuario con el id ${ id }`
            })
        }

        await user.update({ status: 0 });

        res.json( user );
        
    } catch (error) {
        console.log( error );
        res.status( 500 ).json({
            msg: 'Hable con el administrador'
        });
    }
}