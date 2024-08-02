import { NextFunction, Request, Response } from "express";
import { generateToken } from "./jwt";
import db from "../models/main";
import { errorHandler } from "./error";
import { initial_credits } from "../config/gameInfo";
import { HttpStatusCodes } from "../constants/httpStatusCodes";
import { severityLevels } from "../constants/sevirityLevels";
import { sessionErrors } from "../constants/ErrorLogs";


const creatNewSession = async (req: Request, res: Response,next:NextFunction) => {
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

const updateSessionAfterSpin = async (req:Request,res:Response,next:NextFunction)=>{
    const {session, reward} = res.locals;
        try {
            const currentCredits = session?.currentCredits - 1 + reward;
            const isActive = currentCredits > 0;

            await db.Session.update({
                currentCredits,
                isActive
            },{
                where:{
                    token:session.token
                }
            });
    
            res.locals.session = {
                ...session,
                currentCredits,
                isActive
            }
            return next();
        } catch (error) {
            return errorHandler(res, error, 'updateSession');
        }
}

const normalizeSessionForResponse = (req:Request,res:Response,next:NextFunction)=>{
    try {
        const {session} = res.locals;
        const {token,initialCredits,currentCredits,isActive} = session;

        res.locals.data = {
            token,
            initialCredits,
            currentCredits,
            isActive
        }
        res.locals.message = 'Session created successfully';
        return next();
    } catch (error) {
        return errorHandler(res, error, 'normalizeSessionForResponse');
    }
}

const obtainSession = async (req:Request,res:Response,next:NextFunction)=>{
    try {
        const {token} = req.params;
        const session = await db.Session.findOne({
            where:{
                token
            }
        });

        if(!session){
            throw {
                statusCode: HttpStatusCodes.NOT_FOUND,
                log: `${sessionErrors.SESSION_NOT_FOUND} with token: ${token}`,
                clientFacingMessage: sessionErrors.SESSION_NOT_FOUND,
                severityLevel: severityLevels.ERROR
              };
        }

        res.locals.session = session.toJSON();
        return next();
    } catch (error) {
        return errorHandler(res, error, 'obtainSession');
    }
}

const cashOutSession = async (req:Request,res:Response,next:NextFunction)=>{
    const {session} = res.locals;
    try {
        await db.Session.update({
            isActive:false,
            cashOutCredits:session.currentCredits,
            currentCredits:0
        },{
            where:{
                token:session.token
            }
        });

        res.locals.session = {
            ...session,
            isActive:false
        }
        res.locals.message = 'Session cashed out successfully';
        res.locals.data = {
            token:session.token,
            prize:session.currentCredits
        }
        return next();
    } catch (error) {
        return errorHandler(res, error, 'cashOutSession');
    }
}

const checkIfSessionIsActive = (req:Request,res:Response,next:NextFunction)=>{
    const {session} = res.locals;
    try {
        if(!session.isActive){
            throw {
                statusCode: HttpStatusCodes.FORBIDDEN,
                log: `${sessionErrors.SESSION_NOT_ACTIVE} with token: ${session.token}`,
                clientFacingMessage: sessionErrors.SESSION_NOT_ACTIVE,
                severityLevel: severityLevels.ERROR
        }
    }
        return next();
    } catch (error) {
        return errorHandler(res, error, 'checkIfSessionIsActive');
    }
}

export {
    creatNewSession,
    normalizeSessionForResponse,
    checkIfSessionIsActive,
    obtainSession,
    updateSessionAfterSpin,
    cashOutSession
}