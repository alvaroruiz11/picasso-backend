"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const controllers_1 = require("../controllers");
const middlewares_1 = require("../middlewares");
const router = (0, express_1.Router)();
// login
router.post('/login', [
    (0, express_validator_1.check)('email', 'Tiene que ser un correo electrónico').isEmail(),
    (0, express_validator_1.check)('password', 'Es obligatorio la contraseña').not().isEmpty(),
    middlewares_1.validateBody
], controllers_1.login);
// renewToken
router.get('/renew', middlewares_1.validateJWT, controllers_1.revalidateToke);
exports.default = router;
//# sourceMappingURL=auth.js.map