import { Request, Response } from 'express';
import { MoneroWallet } from 'monero-javascript';
import BtcService from '../services/btcService';
import { MoneroService } from '../services/moneroService';

class TransactionController {
    private btcService: BtcService;
    private moneroService: MoneroService;

    constructor() {
        this.btcService = new BtcService();
        const moneroWallet = new MoneroWallet(/* constructor arguments if any */);
        this.moneroService = new MoneroService(moneroWallet);
    }

    public async initiateSwap(req: Request, res: Response): Promise<void> {
        const { fromCurrency, toCurrency, amount, recipientAddress } = req.body;

        try {
            let result;
            if (fromCurrency === 'BTC' && toCurrency === 'XMR') {
                const btcAddress = await this.btcService.generateAddress();
                const qrCode = await this.btcService.generateQRCode(btcAddress);
                // Send QR code to the user to send BTC
                res.status(200).json({ qrCode, btcAddress });
                // Wait for BTC transaction to be confirmed (this part needs to be implemented)
                // After confirmation, send XMR to the recipient
                result = await this.moneroService.initiateSwap(amount, recipientAddress);
            } else if (fromCurrency === 'XMR' && toCurrency === 'BTC') {
                // Similar logic for XMR to BTC swap
                result = await this.moneroService.initiateSwap(amount, recipientAddress);
                // Wait for XMR transaction to be confirmed (this part needs to be implemented)
                // After confirmation, send BTC to the recipient
                const fromAddress = 'yourFromAddress'; // Replace with actual from address
                const privateKey = 'yourPrivateKey'; // Replace with actual private key
                const btcTxid = await this.btcService.sendToAddress(fromAddress, privateKey, recipientAddress, amount);
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
            res.status (500).json({ error: (error as Error).message });
        }
    }
}

export default TransactionController;