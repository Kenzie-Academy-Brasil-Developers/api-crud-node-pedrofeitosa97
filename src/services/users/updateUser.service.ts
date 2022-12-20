import AppDataSource from "../../data-source"
import { User } from "../../entities/user.entity"
import { AppError } from "../../errors/AppError"
import { IUserUpdate } from "../../interfaces/users"

const updateUserService = async (body: IUserUpdate, user_id: string): Promise<IUserUpdate> => {
    const dataRepository = AppDataSource.getRepository(User)
    const user = await dataRepository.findOneBy({id: user_id})

    if (!user) {
        throw new AppError("ID DE USUÁRIO INVÁLIDO", 404)
    }

    if (body.hasOwnProperty('isAdm') || body.hasOwnProperty('id') || body.hasOwnProperty('isActive')) {
        throw new AppError("Campos inválidos.", 401)
    }

    const updateUser = dataRepository.create({
        ...user,
        ...body
    })
    
    await dataRepository.save(updateUser)

    return updateUser
}

export default updateUserService