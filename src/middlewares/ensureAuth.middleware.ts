import { Request, Response, NextFunction } from "express"
import jwt from 'jsonwebtoken'
import 'dotenv/config'
import { AppError } from "../errors/AppError"


const ensureAuthMiddleware = async (request: Request, response: Response, next: NextFunction) => {

    let token = request.headers.authorization

    if(!token) {
        throw new AppError("TOKEN INVÁLIDO!", 401)
    }

    token = token.split(' ')[1]

    jwt.verify(token, String(process.env.SECRET_KEY), (error, decoded: any) => {
        if(error) {
            throw new AppError("TOKEN INVÁLIDO!", 401)
        }

        request.user = {
            id: decoded.sub,
            email: decoded.email
        }
        
        return next()
    })
    


}

export default ensureAuthMiddleware