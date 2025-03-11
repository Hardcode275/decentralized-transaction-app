import { Request, Response } from 'express';
import { MoneroWallet } from 'monero-javascript';
import { BtcService } from '../services/btcService';
import { FeeService } from '../services/feeservice';
import { MoneroService } from '../services/moneroService';

class TransactionController {
    private btcService: BtcService;
    private moneroService: MoneroService;
    private feeService: FeeService;

    constructor() {
        this.btcService = new BtcService();
        const moneroWallet = new MoneroWallet(/* constructor arguments if any */);
        this.moneroService = new MoneroService(moneroWallet);
        this.feeService = new FeeService();
    }

    public async initiateSwap(req: Request, res: Response): Promise<void> {
        const { fromCurrency, toCurrency, amount, recipientAddress } = req.body;

        try {
            const fee = this.feeService.calculateFee(amount);
            const netAmount = this.feeService.getNetAmount(amount);
            const feeAddress = this.feeService.getFeeAddress(fromCurrency);

            let result;
            if (fromCurrency === 'BTC' && toCurrency === 'XMR') {
                const btcAddress = await this.btcService.generateAddress();
                const qrCode = await this.btcService.generateQRCode(btcAddress);
                // Send QR code to the user to send BTC
                res.status(200).json({ qrCode, btcAddress });
                // Wait for BTC transaction to be confirmed
                const privateKey = process.env.BTC_PRIVATE_KEY;
                if (!privateKey) {
                    throw new Error('BTC_PRIVATE_KEY is not defined');
                }
                const btcTxid = await this.btcService.sendToAddress(btcAddress, privateKey, feeAddress, fee); // Send fee to fee address
                await this.btcService.waitForConfirmation(btcTxid); // Wait for BTC confirmation
                result = await this.moneroService.initiateSwap(netAmount, recipientAddress);
            } else if (fromCurrency === 'XMR' && toCurrency === 'BTC') {
                // Similar logic for XMR to BTC swap
                const xmrTxid = await this.moneroService.initiateSwap(amount, recipientAddress);
                await this.moneroService.waitForConfirmation(xmrTxid); // Wait for XMR confirmation
                const fromAddress = 'yourFromAddress'; // Replace with actual from address
                const privateKey = process.env.BTC_PRIVATE_KEY; // Use private key from environment variable
                if (!privateKey) {
                    throw new Error('BTC_PRIVATE_KEY is not defined');
                }
                await this.btcService.sendToAddress(fromAddress, privateKey, feeAddress, fee); // Send fee to fee address
                const btcTxid = await this.btcService.sendToAddress(fromAddress, privateKey, recipientAddress, netAmount);
                result = btcTxid;
            } else {
                res.status(400).json({ error: 'Invalid currency pair' });
                return;
            }

            res.status(200).json(result);
        } catch (error) {
            const errorMessage = (error as Error).message;
            res.status(500).json({ error: errorMessage });
        }
    }

    public async getTransactionStatus(req: Request, res: Response): Promise<void> {
        const { transactionId } = req.params;

        try {
            const btcStatus = await this.btcService.getTransaction(transactionId);
            const moneroStatus = await this.moneroService.getTransactionStatus(transactionId);

            const status = btcStatus || moneroStatus;

            if (!status) {
                res.status(404).json({ error: 'Transaction not found' });
                return;
            }

            res.status(200).json(status);
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    }
}

export default TransactionController;