import { Router } from 'express';
import { check } from 'express-validator';
import { login, revalidateToke } from '../controllers';
import { validateBody, validateJWT } from '../middlewares';

const router = Router();

// login
router.post('/login', [
    check('email', 'Tiene que ser un correo electrónico').isEmail(),
    check('password', 'Es obligatorio la contraseña').not().isEmpty(),
    validateBody
], login );

// renewToken
router.get('/renew', validateJWT, revalidateToke );


export default router;