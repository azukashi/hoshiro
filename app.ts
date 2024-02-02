import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import routes from './routes';
import { authErrorHandler } from './middleware/autherror';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('short'));
app.use(cors());
app.use('/', routes);
app.use(authErrorHandler);

export default app;
