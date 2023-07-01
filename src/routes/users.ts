import { Router } from 'express';
import { check } from 'express-validator';

import { createUser, deleteUser, getUserById, getUsers, updateUser } from '../controllers';
import { validateBody, validateJWT } from '../middlewares';


const router = Router();

// getUsers
router.get('/', getUsers );
// getUserById
router.get('/:id',[
    check('id', 'Tiene que ser un id de UUID').isUUID(),
    validateBody
], getUserById );
// createUser
router.post('/',[
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'Tiene que ser un correo electronico').isEmail(),
    check('password', 'La contraseña debe tener más de 6 caracteres').isLength({ min: 6 }),
    validateBody
], createUser );
// updateUser
router.put('/:id', [
    check('id', 'Tiene que ser un id de UUID').isUUID(),
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'La contraseña debe tener más de 6 caracteres').isLength({ min: 6 }),
    validateBody
], updateUser );
// deleteUser
router.delete('/:id', [
    validateJWT,
    check('id', 'Tiene que ser un id de UUID').isUUID(),
    validateBody
], deleteUser );


export default router;