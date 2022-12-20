import { IUserRequest } from "../../interfaces/users"
import AppDataSource from "../../data-source"
import { User } from "../../entities/user.entity"
import { AppError } from "../../errors/AppError"

const createUserService = async(data: IUserRequest): Promise<Array<number | {}>> => {

        const dataRepository = AppDataSource.getRepository(User)
        
        const userFound = await dataRepository.findOneBy({
            email: data.email
        })

        if(userFound) {
            throw new AppError("USUÁRIO JÁ CADASTRADO!", 400)
        }

        const user = dataRepository.create(data)
    
        await dataRepository.save(user)
    
        const returnedUser = {
            ...user,
            password: undefined
        }
    
        return [201, returnedUser]
}

export default createUserService