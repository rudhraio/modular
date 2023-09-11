import express, { Request, Response } from 'express';
import cors from 'cors';
import routes from "./routes";
import { successResponse } from './common/helpers/response/success';
import { notFoundResponse } from './common/helpers/response/error';
import requestLogger from './common/helpers/middelware/request-logger';


export const app = express();

app.use(express.json());
app.use(cors());

// To check server status
app.get('/api/ping', requestLogger, (_: Request, res: Response) => {
    return successResponse(res, "ok");
});

// To include additional routes
app.use("/api/v1", requestLogger, routes);

// Catch-all undefined routes
app.all('*', requestLogger, (req: Request, res: Response) => {
    return notFoundResponse(res, "No matching URL found");
});