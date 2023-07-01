import { Client } from '../models';

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