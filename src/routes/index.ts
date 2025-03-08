import { Application, Router } from 'express';
import TransactionController from '../controllers/transactionController';

const router = Router();
const transactionController = new TransactionController();

export function setRoutes(app: Application) {
    app.use('/api/transactions', router);
    router.post('/swap', transactionController.initiateSwap.bind(transactionController));
    router.get('/status/:id', transactionController.getTransactionStatus.bind(transactionController));
}