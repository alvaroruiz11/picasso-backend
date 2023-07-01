"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteClient = exports.updateClient = exports.createClient = exports.getClientByTerm = exports.getClients = void 0;
const validator_1 = __importDefault(require("validator"));
const models_1 = require("../models");
const getClients = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const clients = yield models_1.Client.findAll({
            where: {
                status: 1
            }
        });
        res.json(clients);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
});
exports.getClients = getClients;
const getClientByTerm = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { term } = req.params;
    let client;
    try {
        if (validator_1.default.isUUID(term)) {
            client = yield models_1.Client.findByPk(term);
        }
        else {
            client = yield models_1.Client.findOne({
                where: {
                    cedula: term
                }
            });
        }
        res.json(client);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
});
exports.getClientByTerm = getClientByTerm;
const createClient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { cedula, firstName, lastName, addres, phone } = req.body;
    try {
        const isExistCedula = yield models_1.Client.findOne({
            where: {
                cedula
            }
        });
        if (isExistCedula) {
            return res.json(400).json({
                msg: `Ya existe la cedula ${cedula}`
            });
        }
        const client = models_1.Client.build({ cedula, firstName, lastName, addres, phone });
        yield client.save();
        res.json(client);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
});
exports.createClient = createClient;
const updateClient = (_req, res) => {
    res.json('updateClient');
};
exports.updateClient = updateClient;
const deleteClient = (_req, res) => {
    res.json('deleteClient');
};
exports.deleteClient = deleteClient;
//# sourceMappingURL=clients.js.map