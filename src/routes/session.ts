import express from 'express';
import { creatNewSession, normalizeSessionForResponse } from '../controllers/sessiom';
import { sendResponse } from '../controllers/general';

const sessionRouter = express.Router();

sessionRouter.post('/new-session',
    creatNewSession,
    normalizeSessionForResponse,
    sendResponse
);

export default sessionRouter;
