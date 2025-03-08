export interface TransactionRequest {
    fromCurrency: 'BTC' | 'XMR';
    toCurrency: 'BTC' | 'XMR';
    amount: number;
    recipientAddress: string;
}

export interface TransactionResponse {
    transactionId: string;
    status: 'pending' | 'completed' | 'failed';
    message?: string;
}