import express from 'express';
import 'express-async-errors';
import cors from 'cors';

import './database/connection'

import routes from './routes';
import errorHandler from './errors/handler';

const PORT = process.env.PORT || 3333
const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errorHandler);

app.listen(PORT);