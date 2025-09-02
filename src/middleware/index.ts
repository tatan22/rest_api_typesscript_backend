import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
export const handleInputErrors = (req : Request, res : Response, next: NextFunction) => {
    let erros = validationResult(req);
    if(!erros.isEmpty()){
        return res.status(400).json({errors: erros.array()})
        // error 400 bad request 
    }
    next(); // ejecutamos el siguiente middleware o función
}