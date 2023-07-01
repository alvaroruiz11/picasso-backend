"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const controllers_1 = require("../controllers");
const middlewares_1 = require("../middlewares");
const router = (0, express_1.Router)();
// getUsers
router.get('/', controllers_1.getUsers);
// getUserById
router.get('/:id', [
    (0, express_validator_1.check)('id', 'Tiene que ser un id de UUID').isUUID(),
    middlewares_1.validateBody
], controllers_1.getUserById);
// createUser
router.post('/', [
    (0, express_validator_1.check)('name', 'El nombre es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('email', 'Tiene que ser un correo electronico').isEmail(),
    (0, express_validator_1.check)('password', 'La contraseña debe tener más de 6 caracteres').isLength({ min: 6 }),
    middlewares_1.validateBody
], controllers_1.createUser);
// updateUser
router.put('/:id', [
    (0, express_validator_1.check)('id', 'Tiene que ser un id de UUID').isUUID(),
    (0, express_validator_1.check)('name', 'El nombre es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('password', 'La contraseña debe tener más de 6 caracteres').isLength({ min: 6 }),
    middlewares_1.validateBody
], controllers_1.updateUser);
// deleteUser
router.delete('/:id', [
    middlewares_1.validateJWT,
    (0, express_validator_1.check)('id', 'Tiene que ser un id de UUID').isUUID(),
    middlewares_1.validateBody
], controllers_1.deleteUser);
exports.default = router;
//# sourceMappingURL=users.js.map