import { NextFunction, Request, Response } from "express";
import db from "../models/main";
import { errorHandler } from "./error";
import { SlotKey, SLOT_OPTIONS } from '../constants/slotOptions';
import { v4 as uuidv4 } from 'uuid';


const decideRewardForWinningSequence = (sequence: SlotKey[]): number => {
    const slot = sequence[0];
    return SLOT_OPTIONS[slot].reward;
};

const isWinningSequence = (sequence:string[]):boolean=>{
    const first = sequence[0];
    return sequence.every(slot => slot === first);
}

const createNewSpin = async (req: Request, res: Response,next:NextFunction) => {
    try {
        const {session,sequence,cheatApplied,isWinningSequence} = res.locals;
        const reward = isWinningSequence ? decideRewardForWinningSequence(sequence) : 0;
        
        const newSpin = await db.Spin.create({
            spin:uuidv4(),
            result:sequence?.join(','),
            creditsWon:reward,
            cheatApplied,
            sessionId:session.id
        });
        
        res.locals.reward = reward;
        res.locals.spin = newSpin;
        return next();
    } catch (error:unknown) {
        return errorHandler(res, error, 'creatNewSession');        
    }
}

const rollSequence = () => {
    const sequence = [];
    for (let i = 0; i < 3; i++) {
        const random = Math.floor(Math.random() * 4);
        const slot = Object.keys(SLOT_OPTIONS)[random];
        sequence.push(slot);
    }

    return sequence;
};

const raffleNewSequence = (req: Request, res: Response, next: NextFunction) => {
    try {
        const sequence = rollSequence()

        res.locals.isWinningSequence = isWinningSequence(sequence);
        res.locals.sequence = sequence;
        return next();
    } catch (error) {
        return errorHandler(res, error, 'raffleNewSequence');
    }
};

const applyCheat = (req: Request, res: Response, next: NextFunction) => {
    try {
        res.locals.cheatApplied = true;
        const newSequence = rollSequence();
        res.locals.sequence = newSequence;
        res.locals.isWinningSequence = isWinningSequence(newSequence);
        return next();
    } catch (error) {
        return errorHandler(res, error, 'raffleHouseFavorNewSequenceIfNeeded');
    }
}

const raffleHouseFavorNewSequenceIfNeeded = (req: Request, res: Response, next: NextFunction) => {
    try {
        const { session, isWinningSequence } = res.locals;
        if (session.currentCredits < 40 || !isWinningSequence) {
            return next();

        }

        if (session.currentCredits >= 40 && session.currentCredits <= 60) {
            const chance = Math.random();
            if (chance < 0.30) {
                return applyCheat(req, res, next);
            }
        }

        if (session.currentCredits > 60) {
            const chance = Math.random();
            if (chance < 0.60) {
               return applyCheat(req, res, next);
            }
        }

        return next();
    } catch (error) {
        return errorHandler(res, error, 'raffleHouseFavorNewSequenceIfNeeded');
    }
};

export {
    createNewSpin,
    raffleNewSequence,
    raffleHouseFavorNewSequenceIfNeeded
}