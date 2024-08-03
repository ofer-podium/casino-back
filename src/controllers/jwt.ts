// Mainly for future use
import jsonwebtoken from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

const secret = process.env.TOKEN_SECRET ||  'secret';
const expiresIn = process.env.TOKEN_EXPIRES_IN || '1h'; 

const generateToken = ():string=>{
    const token = jsonwebtoken.sign({id:uuidv4()},secret ,{expiresIn});
    return token;
}

const verifyToken = (token:string):string|object=>{
    const data = jsonwebtoken.verify(token,secret);
    return data;
}

const decodeToken = (token:string):string|object|null=>{
    const data = jsonwebtoken.decode(token);
    return data;
}

export {
    generateToken,
    verifyToken,
    decodeToken

};