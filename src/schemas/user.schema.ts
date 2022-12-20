import * as yup from 'yup'
import { SchemaOf } from 'yup'
import { IUserPatch } from '../interfaces/users'


const validatedBodySchema: SchemaOf<IUserPatch> = yup.object().shape({
    id: yup.string().optional(),
    name: yup.string().required(),
    email: yup.string().required(),
    isAdm: yup.string().optional(),
    createdAt: yup.date().optional(),
    updatedAt: yup.date().optional()
})

export {validatedBodySchema}