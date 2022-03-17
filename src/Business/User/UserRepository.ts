import { User } from "../../Model/User"

export interface UserRepository{
    insert(user: User):Promise<User>
    findByEmail(email: string):Promise<User | null>
}