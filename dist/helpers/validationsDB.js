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
Object.defineProperty(exports, "__esModule", { value: true });
exports.existPhone = exports.existClientId = void 0;
const models_1 = require("../models");
const existClientId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExistClient = yield models_1.Client.findByPk(id);
    if (!isExistClient) {
        throw new Error(`No existe clienten con el id ${id}`);
    }
});
exports.existClientId = existClientId;
const existPhone = (phone) => __awaiter(void 0, void 0, void 0, function* () {
    const isExistPhone = yield models_1.Client.findOne({
        where: {
            phone
        }
    });
    if (isExistPhone) {
        throw new Error(`Ya existe el numero de celular ${phone}`);
    }
});
exports.existPhone = existPhone;
//# sourceMappingURL=validationsDB.js.map