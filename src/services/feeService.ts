const FEE_PERCENTAGE = 0.01; // 1% de comisión
const FEE_ADDRESS_BTC = 'yourBtcFeeAddress'; // Reemplaza con la dirección de tu billetera BTC para recibir la comisión
const FEE_ADDRESS_XMR = 'yourXmrFeeAddress'; // Reemplaza con la dirección de tu billetera XMR para recibir la comisión

export class FeeService {
    calculateFee(amount: number): number {
        return amount * FEE_PERCENTAGE;
    }

    getNetAmount(amount: number): number {
        return amount - this.calculateFee(amount);
    }

    getFeeAddress(currency: string): string {
        if (currency === 'BTC') {
            return FEE_ADDRESS_BTC;
        } else if (currency === 'XMR') {
            return FEE_ADDRESS_XMR;
        } else {
            throw new Error('Unsupported currency');
        }
    }
}