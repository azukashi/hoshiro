import express from 'express';
import morgan from 'morgan';
import routes from './routes';
import { root } from './routes/info/root';
import { authErrorHandler } from './middleware/autherror';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('short'));
app.use('/api', routes);

app.get('/', root);
app.use(authErrorHandler);

export default app;
