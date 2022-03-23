import { Request, Response } from "express"
import UserBusiness from "../../Business/User/UserBusiness"
import UserData from "../../Data/User/UserData"
import { LoginInputDTO, SignupInputDTO } from "../../Model/User"

export default class UserController {
    private userBusiness: UserBusiness
    constructor(
    ) {
        this.userBusiness = new UserBusiness(new UserData())
    }


    signup = async (req: Request, res: Response) => {
        const { name, email, password, role } = req.body

        const input: SignupInputDTO = {
            name,
            email,
            password,
            role
        }

        try {
            const token = await this.userBusiness.signup(input)
            res.status(201).send({ message: "Usuário Cadastrado com sucesso!", token })

        } catch (error: any) {
            res.status(error.code || 400).send(error.message || error.sqlMessage)
        }
    }

    login = async (req: Request, res: Response) => {
        
        const { email, password } = req.body
        const input: LoginInputDTO = {
            email,
            password
        }

        try {
            const token = await this.userBusiness.login(input)
            res.status(200).send({ token })

        } catch (error: any) {
            res.status(error.code || 400).send(error.message || error.sqlMessage)
        }
    }
}