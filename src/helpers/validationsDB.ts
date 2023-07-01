import { Client } from '../models';

export const existClientId = async ( id: string ) => {


    const isExistClient = await Client.findByPk( id );

    if( !isExistClient ){
        throw new Error(`No existe clienten con el id ${ id }`);
    }
    


}

export const existPhone = async ( phone: string ) => {


    const isExistPhone = await Client.findOne({ 
        where: {
            phone
        }
    });

    if( isExistPhone ){
        throw new Error(`Ya existe el numero de celular ${ phone }`);
    }
    


}