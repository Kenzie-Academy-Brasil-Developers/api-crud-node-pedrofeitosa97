import AppDataSource from "../../data-source"
import { User } from "../../entities/user.entity"

const listUsersService = async (): Promise<object> => {
    const dataRepository = AppDataSource.getRepository(User)
    const users = await dataRepository.find({
        select: {
            id: true,
            name: true,
            email: true,
            isAdm: true,
            isActive: true,
            createdAt: true,
            updatedAt: true
        },
    })
    return users
}

export default listUsersService