import { CustomError } from "../../Error/CustomError"
import { LoginInputDTO, SignupInputDTO, User, USER_ROLE } from "../../Model/User"
import { HashManager } from "../../Services/hashManager"
import { Authenticator } from "../../Utilities/authenticator"
import { IdGenerator } from "../../Utilities/idGenerator"
import { UserRepository } from "./UserRepository"

export default class UserBusiness {
    private idGenerator: IdGenerator
    private hashManager: HashManager
    private authenticator: Authenticator
    private userData: UserRepository

    constructor(
        userDataImplementation: UserRepository
    ) {
        this.userData = userDataImplementation
        this.idGenerator = new IdGenerator()
        this.hashManager = new HashManager()
        this.authenticator = new Authenticator()
    }

    signup = async (input: SignupInputDTO) => {
        const { name, email, password, role } = input

        if (!name || !email || !password || !role) {
            throw new CustomError(422, "Para realizar o cadastro de um novo usuário é necessário informar os seguintes campos: name, email, password e role.")
        }

        if (role !== USER_ROLE.ADMIN && role !== USER_ROLE.NORMAL) {
            throw new CustomError(422, "Os roles disponíveis para cadastro são: 'ADMIN', ou 'NORMAL'.")
        }

        const registeredUser = await this.userData.findByEmail(email)

        if (registeredUser) {
            throw new CustomError(409, "Email já cadastrado!")
        }

        const id: string = this.idGenerator.generate()

        const hashedPassword = await this.hashManager.hash(password)

        const user = new User(
            id,
            name,
            email,
            hashedPassword,
            role
        )

        await this.userData.insert(user)
        const token = this.authenticator.generateToken({ id, role })

        return token
    }

    login = async (input: LoginInputDTO) => {

        const { email, password } = input

        if (!email || !password) {
            throw new CustomError(422, "Para realizar login é necessário informar os seguintes campos:  email, password.")
        }

        const registeredUser = await this.userData.findByEmail(email)

        if (!registeredUser) {
            throw new CustomError(404, "E-mail não cadastrado no nosso banco de dados.")
        }

        const hashedPassword = registeredUser.getPassword()
        const id = registeredUser.getId()
        const role = registeredUser.getRole()

        const comparedPassword: boolean = await this.hashManager.compareHash(password, hashedPassword)

        if (!comparedPassword) {
            throw new CustomError(422, "Password inválido.")
        }

        const token = this.authenticator.generateToken({ id: id, role: role })

        return token
    }
}