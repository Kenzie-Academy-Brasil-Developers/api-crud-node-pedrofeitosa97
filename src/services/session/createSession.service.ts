import AppDataSource from "../../data-source"
import { User } from "../../entities/user.entity"
import { IUserLogin } from "../../interfaces/users"
import jwt from "jsonwebtoken"
import { compare } from "bcryptjs"
import 'dotenv/config'
import { AppError } from "../../errors/AppError"

const createSessionService = async ( { email, password}: IUserLogin): Promise<Array<number | string>> => {

    const dataRepository = AppDataSource.getRepository(User)

    const user = await dataRepository.findOneBy({
        email: email
    })
    
    if(!user) {
        throw new AppError("USUÁRIO NÃO EXISTE!", 403)
    }
    
    const passwordMatches = await compare(password, user.password)
    
    if(!passwordMatches) {
        throw new AppError("SENHA ERRADA!", 403)
    }
    const token = jwt.sign(
        {
            email: user.email,
            isAdm: String(user.isAdm)
        },
        String(process.env.SECRET_KEY),
        {
            subject: user.id,
            expiresIn: '24h'
        }
    )

    return [200, token]
}

export default createSessionService