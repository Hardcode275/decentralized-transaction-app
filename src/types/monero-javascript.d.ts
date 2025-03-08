declare module 'monero-javascript' {
    export class MoneroWallet {
        constructor(/* constructor arguments if any */);
        transfer(recipientAddress: string, amount: number): Promise<{ id: string }>;
        getTxs(): Promise<any[]>;
        getBalance(): Promise<number>;
    }
}