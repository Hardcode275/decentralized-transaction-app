import { MoneroWallet } from 'monero-javascript';

export class MoneroService {
    private wallet: MoneroWallet;

    constructor(wallet: MoneroWallet) {
        this.wallet = wallet;
    }

    async initiateSwap(amount: number, recipientAddress: string): Promise<string> {
        const tx = await this.wallet.transfer(recipientAddress, amount);
        return tx.id;
    }

    async getTransactionHistory(): Promise<any[]> {
        const history = await this.wallet.getTxs();
        return history;
    }

    async checkBalance(): Promise<number> {
        const balance = await this.wallet.getBalance();
        return balance;
    }

    async getTransactionStatus(transactionId: string): Promise<any> {
        const transactions = await this.wallet.getTxs();
        const transaction = transactions.find(tx => tx.id === transactionId);
        return transaction || null;
    }

    async waitForConfirmation(txid: string, confirmations: number = 1, interval: number = 30000): Promise<void> {
        while (true) {
            const tx = await this.getTransactionStatus(txid);
            if (tx && tx.confirmations >= confirmations) {
                return;
            }
            await new Promise(resolve => setTimeout(resolve, interval));
        }
    }
}