"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const models_1 = require("./models");
const server = new models_1.Server();
server.listen();
//# sourceMappingURL=main.js.map