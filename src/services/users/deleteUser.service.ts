import AppDataSource from "../../data-source"
import { User } from "../../entities/user.entity"
import { AppError } from "../../errors/AppError"

const deleteUserService = async (user_id: string) => {

    const dataRepository = AppDataSource.getRepository(User)

    const userDelete: any = await dataRepository.findOneBy({
        id: user_id
    })

    if(!userDelete) {
        throw new AppError("O USUÁRIO NÃO EXISTE!", 404)
    }

    if (!userDelete.isActive) {
        throw new AppError("O USUÁRIO JÁ ESTÁ DESATIVADO!", 400)
    }

    userDelete.isActive = false
    await dataRepository.save(userDelete) 
    return 204
}

export default deleteUserService