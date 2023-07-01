"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clientsRouter = exports.authRouter = exports.usersRouter = void 0;
var users_1 = require("./users");
Object.defineProperty(exports, "usersRouter", { enumerable: true, get: function () { return __importDefault(users_1).default; } });
var auth_1 = require("./auth");
Object.defineProperty(exports, "authRouter", { enumerable: true, get: function () { return __importDefault(auth_1).default; } });
var clients_1 = require("./clients");
Object.defineProperty(exports, "clientsRouter", { enumerable: true, get: function () { return __importDefault(clients_1).default; } });
//# sourceMappingURL=index.js.map