import express from 'express';
import { webpack } from 'webpack';
import devMiddleware from 'webpack-dev-middleware';
import hotMiddleware from 'webpack-hot-middleware';
import path from 'path';
import playerRouter from './player';

const PORT = 8080;

const app = express();

const config = require('../../webpack.client');

const compiler = webpack(config);

app.use(devMiddleware(compiler, { publicPath: config.output.publicPath }));
app.use(hotMiddleware(compiler, { path: '/__reload' }));
app.use(express.json());
app.use('/assets', express.static(path.join(__dirname, '../assets')));
app.use(express.static(path.join(__dirname, '../dist')));
app.use('/player', playerRouter);
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

app.listen(PORT, () => console.log('SERVER CONNECTED'));
