import { Request, Response } from "express";
import { IUserLogin } from "../../interfaces/users";
import createSessionService from "../../services/session/createSession.service";

const createSessionController = async ( request: Request, response: Response ) => {
    const loginData: IUserLogin = request.body
    const [status, token] = await createSessionService(loginData)
    return response.status(status as number).json({token})
}

export { createSessionController }