"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setRoutes = void 0;
const express_1 = require("express");
const transactionController_1 = __importDefault(require("../controllers/transactionController"));
const router = (0, express_1.Router)();
const transactionController = new transactionController_1.default();
function setRoutes(app) {
    app.use('/api/transactions', router);
    router.post('/swap', transactionController.initiateSwap.bind(transactionController));
    router.get('/status/:id', transactionController.getTransactionStatus.bind(transactionController));
}
exports.setRoutes = setRoutes;
