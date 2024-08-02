import { NextFunction, Request, Response } from "express";
import { generateToken } from "./jwt";
import db from "../models/main";
import { errorHandler } from "./error";
import { initial_credits } from "../config/gameInfo";

const createNewSpin = async (req: Request, res: Response,next:NextFunction) => {
    try {
        const session = await db.Session.create({
            token: generateToken(),
            initialCredits: initial_credits,
            currentCredits: initial_credits,
            isActive: true
        });
        
        res.locals.session = session.toJSON();
        return next();
    } catch (error:unknown) {
        return errorHandler(res, error, 'creatNewSession');        
    }
}

export {
    createNewSpin
}