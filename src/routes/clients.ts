import { Router } from 'express';
import { check } from 'express-validator';

import { createClient, deleteClient, getClientByTerm, getClients, updateClient } from '../controllers';
import { validateBody, validateJWT } from '../middlewares';
import { existPhone } from '../helpers';

const router = Router();

// getClients
router.get('/', getClients );

// getClientById
router.get('/:term', getClientByTerm );

// createClient
router.post('/', [
    validateJWT,
    check('cedula', 'La cedula tiene que ser más de 7 digitos').isLength({ min: 7 }),
    check('firstName', 'El nombre es obligatorio').not().isEmpty(),
    check('lastName', 'El apellido es obligatorio').not().isEmpty(),
    check('addres', 'La direccion es obligatorio').not().isEmpty(),
    check('phone', 'El numero de celular tiene que ser más de 8 digitos').isLength({ min: 8 }),
    check('phone').custom( existPhone ),
    validateBody
], createClient );

// updateClient
router.put('/:id', updateClient );

// deleteClient
router.put('/:id', deleteClient );


export default router;