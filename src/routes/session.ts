import express from 'express';
import { creatNewSession } from '../controllers/sessiom';
import { sendResponse } from '../controllers/general';

const sessionRouter = express.Router();

sessionRouter.post('/new-session',
    creatNewSession,
    sendResponse
);

export default sessionRouter;
