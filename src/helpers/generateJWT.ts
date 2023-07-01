import jwt from 'jsonwebtoken';



export const generateJWT = ( id: string ): Promise<string> => {
     return new Promise(( resolve, reject ) => {

        const payload = { id }

        jwt.sign( payload, process.env.SECRETORPRIVATEKEY!, {
            expiresIn: '4h'
        }, ( error, token ) => {
            if( error ) {
                console.log( error );
                reject('No se puedo generar el token');
            }else {
                resolve( token! );
            }
        })

    })

}
``