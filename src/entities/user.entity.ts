import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BeforeInsert } from "typeorm"
import { hashSync } from 'bcryptjs'

@Entity('users')
class User {
    
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ length: 50})
    name: string
    
    @Column({length: 50, unique: true})
    email: string

    @Column({length: 120})
    password: string

    @Column({default: false})
    isAdm: boolean

    @Column({default: true})
    isActive: boolean

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @BeforeInsert()
    hashpassword(){
        this.password = hashSync(this.password, 10)
    }
}


export { User }