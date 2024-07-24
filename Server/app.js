import bodyParser from 'body-parser';
import routes from './routes/index.js';
import createServer from './server.js';
import cors from 'cors'
import rateLimit from 'express-rate-limit';
import express from 'express';

const app = createServer();
app.set('trust proxy', 1);

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// Middleware to parse incoming request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors())
// Use routes from routes directory
app.use('/', routes);

// Apply the rate limiting middleware to all requests
app.use(limiter);

// Middleware to handle routes
// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});