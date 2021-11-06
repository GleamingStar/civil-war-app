import express from 'express';
import { createServer } from 'http';
import { webpack } from 'webpack';
import devMiddleware from 'webpack-dev-middleware';
import hotMiddleware from 'webpack-hot-middleware';
import path from 'path';
import session from 'express-session';

const PORT = 8080;

const app = express();
const server = createServer(app);

const config = require('../../webpack.client');

const compiler = webpack(config);

app.use(devMiddleware(compiler, { publicPath: config.output.publicPath }));
app.use(hotMiddleware(compiler, { path: '/__reload' }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'dist')));
app.use(
  session({
    secret: 'apollo',
    resave: false,
    saveUninitialized: false,
  })
);
// app.use('/', loginRouter);
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

server.listen(PORT, () => console.log('SERVER CONNECTED'));
