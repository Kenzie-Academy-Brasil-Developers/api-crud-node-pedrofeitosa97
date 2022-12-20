import { Request, Response } from "express";
import { IUserRequest } from "../../interfaces/users";
import createUserService from "../../services/users/createUser.service";
import listUsersService from "../../services/users/listUsers.service";
import deleteUserService from "../../services/users/deleteUser.service";
import updateUserService from "../../services/users/updateUser.service";
import AppDataSource from "../../data-source";
import { validatedBodySchema } from "../../schemas/user.schema";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/AppError";


const createUserController = async ( request: Request, response: Response) => {
    const data: IUserRequest = request.body
    const [status, user] = await createUserService(data)
    return response.status(status as number).json(user)
}

const listUsersController = async ( request: Request, response: Response) => {
    const dataRepository = AppDataSource.getRepository(User)
    const isUserAdmin = await dataRepository.findOneBy({
        email: request.user.email
    })
    if(isUserAdmin?.isAdm === false) {
        throw new AppError("O USUÁRIO PRECISA SER ADMIN!", 403)
    }
    const users = await listUsersService()
    return response.json(users)
}


const deleteUserController = async ( request: Request, response: Response) => {
    const dataRepository = AppDataSource.getRepository(User)
    const isUserAdmin = await dataRepository.findOneBy({
        email: request.user.email
    })
    if(isUserAdmin?.isAdm === false) {
        throw new AppError("O USUÁRIO PRECISA SER ADMIN!", 403)
    }

    const status = await deleteUserService(request.params.id)
    
    return response.status(status).json({
        message: "USUÁRIO DESATIVADO COM SUCESSO!"
    })
}

const updateUserController = async (request: Request, response: Response) => {
    const dataRepository = AppDataSource.getRepository(User)
    const isUserAdmin = await dataRepository.findOneBy({
        id: request.user.id
    })

    if(isUserAdmin?.isAdm === false) {
        throw new AppError("O USUÁRIO PRECISA SER ADMIN!", 401)
    }

    const data = await updateUserService(request.body, request.params.id)

    const validatedData = await validatedBodySchema.validate(data, {
        abortEarly: false,
        stripUnknown: true
    })

    return response.status(200).json(validatedData)
}

export { createUserController, listUsersController, deleteUserController,updateUserController }