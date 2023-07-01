"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const controllers_1 = require("../controllers");
const middlewares_1 = require("../middlewares");
const helpers_1 = require("../helpers");
const router = (0, express_1.Router)();
// getClients
router.get('/', controllers_1.getClients);
// getClientById
router.get('/:term', controllers_1.getClientByTerm);
// createClient
router.post('/', [
    (0, express_validator_1.check)('cedula', 'La cedula tiene que ser más de 7 digitos').isLength({ min: 7 }),
    (0, express_validator_1.check)('firstName', 'El nombre es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('lastName', 'El apellido es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('addres', 'La direccion es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('phone', 'El numero de celular tiene que ser más de 8 digitos').isLength({ min: 8 }),
    (0, express_validator_1.check)('phone').custom(helpers_1.existPhone),
    middlewares_1.validateBody
], controllers_1.createClient);
// updateClient
router.put('/:id', controllers_1.updateClient);
// deleteClient
router.put('/:id', controllers_1.deleteClient);
exports.default = router;
//# sourceMappingURL=clients.js.map