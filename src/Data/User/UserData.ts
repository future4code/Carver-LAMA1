import { UserRepository } from "../../Business/User/UserRepository";
import { User } from "../../Model/User";
import BaseDatabase from "../BaseDatabase";

export default class UserData extends BaseDatabase implements UserRepository {
    protected TABLE_NAME = "Lama_User"

    insert = async (user: User) => {
        try {
            await BaseDatabase
                .connection(this.TABLE_NAME)
                .insert(user)
            return user
        } catch (error: any) {
            throw new Error("Erro ao criar usuário no banco de dados!")
        }
    }

    findByEmail = async (email: string) => {
        try {
            const queryResult: User[] = await BaseDatabase
                .connection(this.TABLE_NAME)
                .select()
                .where({ email })

            return queryResult[0] && User.toUserModel(queryResult[0])
        } catch (error: any) {
            throw new Error("Erro ao buscar usuário no banco!")
        }
    }
}