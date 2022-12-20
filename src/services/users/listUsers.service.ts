import AppDataSource from "../../data-source"
import { User } from "../../entities/user.entity"

const listUsersService = async (): Promise<User[]> => {
    const dataRepository = AppDataSource.getRepository(User)
    const users = await dataRepository.find()
    return users
}

export default listUsersService