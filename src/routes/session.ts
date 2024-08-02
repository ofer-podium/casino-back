import express from 'express';
import { creatNewSession, normalizeSessionForResponse, obtainSession } from '../controllers/sessiom';
import { sendResponse } from '../controllers/general';
import { inspectObtainSessionInput } from '../inspectors/session';

const sessionRouter = express.Router();

sessionRouter.post('/new-session',
    creatNewSession,
    normalizeSessionForResponse,
    sendResponse
);

sessionRouter.post('/new-spin',
    inspectObtainSessionInput,
    obtainSession,
);

export default sessionRouter;
