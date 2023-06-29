import express from "express";
import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import * as winston from "winston";
import * as expressWinston from 'express-winston';
import cors from 'cors';
import swaggerUi from "swagger-ui-express";
import { RegisterRoutes } from "./routes/routes";
import { validateOrReject } from "class-validator";

const swaggerDocument = require('./routes/swagger.json');

dotenv.config();

const port = process.env.PORT;
const app: express.Application = express();

app.use(express.json());
app.use(cors());

const loggerOptions: expressWinston.LoggerOptions = {
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
        winston.format.json(),
        winston.format.prettyPrint(),
        winston.format.colorize({ all: true })
    ),
};

app.use(expressWinston.logger(loggerOptions));

if (!process.env.DEBUG) {
    loggerOptions.meta = false;
};

app.use(expressWinston.logger(loggerOptions));

RegisterRoutes(app);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    validateOrReject(req.body)
        .then(() => next())
        .catch((err) => res.status(400).send(err));
});

// Register Swagger
app.use(
    "/docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument)
);

// Start server
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${port}.`);
});
