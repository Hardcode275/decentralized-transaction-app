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
const monero_javascript_1 = require("monero-javascript"); // Assuming this is the correct import
const btcService_1 = __importDefault(require("../services/btcService"));
const moneroService_1 = require("../services/moneroService");
class TransactionController {
    constructor() {
        this.btcService = new btcService_1.default();
        // Initialize MoneroWallet and pass it to MoneroService
        const moneroWallet = new monero_javascript_1.MoneroWallet( /* constructor arguments if any */);
        this.moneroService = new moneroService_1.MoneroService(moneroWallet);
    }
    initiateSwap(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { fromCurrency, toCurrency, amount, recipientAddress } = req.body;
            try {
                let result;
                if (fromCurrency === 'BTC' && toCurrency === 'XMR') {
                    result = yield this.btcService.initiateSwap(amount, recipientAddress);
                }
                else if (fromCurrency === 'XMR' && toCurrency === 'BTC') {
                    result = yield this.moneroService.initiateSwap(amount, recipientAddress);
                }
                else {
                    res.status(400).json({ error: 'Invalid currency pair' });
                    return;
                }
                res.status(200).json(result);
            }
            catch (error) {
                const errorMessage = error.message;
                res.status(500).json({ error: errorMessage });
            }
        });
    }
    getTransactionStatus(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { transactionId } = req.params;
            try {
                const btcStatus = yield this.btcService.getTransactionStatus(transactionId);
                const moneroStatus = yield this.moneroService.getTransactionStatus(transactionId);
                const status = btcStatus || moneroStatus;
                if (!status) {
                    res.status(404).json({ error: 'Transaction not found' });
                    return;
                }
                res.status(200).json(status);
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        });
    }
}
exports.default = TransactionController;
