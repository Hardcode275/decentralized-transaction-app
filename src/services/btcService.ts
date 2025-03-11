import axios from 'axios';
import axiosRetry from 'axios-retry';
import QRCode from 'qrcode';

const BLOCKCYPHER_API_URL = 'https://api.blockcypher.com/v1/btc/test3';
const BLOCKCYPHER_TOKEN = 'a8b943b404a044029d85b31fc94d0a5c';

// Configurar axios-retry para reintentar solicitudes en caso de errores 429
axiosRetry(axios, { retries: 3, retryCondition: (error) => !!(error.response && error.response.status === 429) });

export class BtcService {
    private balance: number;

    constructor() {
        this.balance = 0; // Initialize balance
    }

    public async checkBalance(address: string): Promise<number> {
        // Logic to check the balance of the given Bitcoin address
        // This is a placeholder for actual implementation
        return this.balance;
    }

    public async initiateSwap(amount: number, targetAddress: string): Promise<string> {
        // Logic to initiate a Bitcoin swap
        // This is a placeholder for actual implementation
        if (amount <= 0) {
            throw new Error("Amount must be greater than zero");
        }
        // Simulate a successful swap
        return `Swap of ${amount} BTC to ${targetAddress} initiated successfully.`;
    }

    public async getTransactionStatus(transactionId: string) {
        // Simulación de estado (debes cambiarlo por una API real)
        if (transactionId === "transaction-id") {
            return { status: "pending", confirmations: 0 };
        }
        return null;
    }

    async generateAddress(): Promise<string> {
        const response = await axios.post(`${BLOCKCYPHER_API_URL}/addrs`, {}, {
            params: { token: BLOCKCYPHER_TOKEN }
        });
        return response.data.address;
    }

    async generateQRCode(address: string): Promise<string> {
        const qrCode = await QRCode.toDataURL(address);
        return qrCode;
    }

    async getTransaction(txid: string): Promise<any> {
        const response = await axios.get(`${BLOCKCYPHER_API_URL}/txs/${txid}`, {
            params: { token: BLOCKCYPHER_TOKEN }
        });
        return response.data;
    }

    async sendToAddress(fromAddress: string, privateKey: string, toAddress: string, amount: number): Promise<string> {
        // Create a new transaction
        const newTx = {
            inputs: [{ addresses: [fromAddress] }],
            outputs: [{ addresses: [toAddress], value: amount }]
        };

        // Sign the transaction
        const response = await axios.post(`${BLOCKCYPHER_API_URL}/txs/new`, newTx, {
            params: { token: BLOCKCYPHER_TOKEN }
        });

        const tx = response.data;
        tx.pubkeys = [];
        tx.signatures = tx.tosign.map((tosign: string) => {
            return this.signTransaction(tosign, privateKey);
        });

        // Send the transaction
        const sendResponse = await axios.post(`${BLOCKCYPHER_API_URL}/txs/send`, tx, {
            params: { token: BLOCKCYPHER_TOKEN }
        });

        return sendResponse.data.tx.hash;
    }

    private signTransaction(tosign: string, privateKey: string): string {
        // Implement the signing logic here
        // You can use a library like bitcoinjs-lib to sign the transaction
        return 'signed_transaction';
    }

    async waitForConfirmation(txid: string, confirmations: number = 1, interval: number = 30000): Promise<void> {
        while (true) {
            const tx = await this.getTransaction(txid);
            if (tx.confirmations >= confirmations) {
                return;
            }
            await new Promise(resolve => setTimeout(resolve, interval));
        }
    }
}