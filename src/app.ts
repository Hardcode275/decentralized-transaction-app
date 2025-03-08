import bodyParser from 'body-parser';
import express from 'express';
import { setRoutes } from './routes';

const app = express();
const port = process.env.PORT || 3000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

setRoutes(app);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});