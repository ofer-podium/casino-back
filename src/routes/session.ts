import express from 'express';
import { cashOutSession, checkIfSessionIsActive, creatNewSession, normalizeSessionForResponse, obtainSession, updateSessionAfterSpin } from '../controllers/session';
import { sendResponse } from '../controllers/general';
import { inspectObtainSessionInput } from '../inspectors/session';
import { createNewSpin, raffleHouseFavorNewSequenceIfNeeded, raffleNewSequence } from '../controllers/spin';

const sessionRouter = express.Router();

sessionRouter.post('/new-session',
    creatNewSession,
    normalizeSessionForResponse,
    sendResponse
);

sessionRouter.post('/:token/new-spin',
    inspectObtainSessionInput,
    obtainSession,
    checkIfSessionIsActive,
    raffleNewSequence,
    raffleHouseFavorNewSequenceIfNeeded,
    createNewSpin,
    updateSessionAfterSpin,
    sendResponse
);

sessionRouter.post('/:token/cash-out',
    inspectObtainSessionInput,
    obtainSession,
    checkIfSessionIsActive,
    cashOutSession,
    sendResponse

    
);

export default sessionRouter;
