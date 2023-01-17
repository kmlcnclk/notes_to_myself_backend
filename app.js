const express = require('express');
const mainRouter = require('./routes/main.router');
const cors = require('cors');
const app = express();
const dotenv = require('dotenv');
const compression = require('compression');
const customErrorHandler = require('./helpers/errors/customErrorHandler');
const connectDatabase = require('./databases/connectDatabase');
const helmet = require('helmet');
const log = require('./tools/index');

dotenv.config({});

connectDatabase();

const PORT = process.env.PORT || 5000;

const corsOptions = {
  origin: [
    // 'https://youtube-music-frontend.vercel.app',
    'http://localhost:3000',
  ],
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH'],
};

app.use(helmet());
app.use(compression());
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(mainRouter);

app.use(customErrorHandler);

app.listen(PORT, () => log.info(`Server running ${process.env.URL}`));
