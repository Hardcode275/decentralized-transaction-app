import { Request, Response } from 'express';
import { MoneroWallet } from 'monero-javascript'; // Assuming this is the correct import
import BtcService from '../services/btcService';
import { MoneroService } from '../services/moneroService';

class TransactionController {
    private btcService: BtcService;
    private moneroService: MoneroService;

    constructor() {
        this.btcService = new BtcService();
        
        // Initialize MoneroWallet and pass it to MoneroService
        const moneroWallet = new MoneroWallet(/* constructor arguments if any */);
        this.moneroService = new MoneroService(moneroWallet);
    }

    public async initiateSwap(req: Request, res: Response): Promise<void> {
        console.log("Headers:", req.headers);
        console.log("Body recibido:", req.body);
    
        const { fromCurrency, toCurrency, amount, recipientAddress } = req.body;
    
        if (!fromCurrency || !toCurrency || !amount || !recipientAddress) {
            res.status(400).json({ error: "Todos los campos son requeridos" });
            return;
        }
    
        try {
            let result;
            if (fromCurrency === 'BTC' && toCurrency === 'XMR') {
                result = await this.btcService.initiateSwap(amount, recipientAddress);
            } else if (fromCurrency === 'XMR' && toCurrency === 'BTC') {
                result = await this.moneroService.initiateSwap(amount, recipientAddress);
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
            const btcStatus = await this.btcService.getTransactionStatus(transactionId);
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