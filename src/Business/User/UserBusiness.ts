import { LoginInputDTO, SignupInputDTO, User, USER_ROLE } from "../../Model/User";
import { HashManager } from "../../Services/hashManager";
import { Authenticator } from "../../Utilities/authenticator";
import { IdGenerator } from "../../Utilities/idGenerator";
import { UserRepository } from "./UserRepository";

export default class UserBusiness {
    private idGenerator: IdGenerator;
    private hashManager: HashManager;
    private authenticator: Authenticator;
    private userData: UserRepository

    constructor(
        userDataImplementation: UserRepository
    ){
        this.userData = userDataImplementation
        this.idGenerator = new IdGenerator()
        this.hashManager = new HashManager()
        this.authenticator = new Authenticator()
    }

    signup = async (input: SignupInputDTO) => {
        const {name, email, password, role} = input

        if(!name || !email || !password || !role){
            throw new Error("Insira todos os campos!")
        }

        if(role !== USER_ROLE.ADMIN && role !== USER_ROLE.NORMAL){
            throw new Error("Não existe esse tipo de usuário!")
        }

        const registeredUser = await this.userData.findByEmail(email)

        if(registeredUser){
            throw new Error("Email já cadastrado!")
        }

        const id:string = this.idGenerator.generate()

        const hashedPassword = await this.hashManager.hash(password)

        const user = new User(
            id,
            name,
            email,
            hashedPassword,
            role
        )

        await this.userData.insert(user)
        const token = this.authenticator.generateToken({id, role})

        return token
    }

    login = async (input: LoginInputDTO) => {
        let statusCode = 400
        const {email, password} = input

        if(!email || !password){
            statusCode = 406
            throw new Error("Insira todos os campos!")
        }

        const registeredUser = await this.userData.findByEmail(email)

        if(!registeredUser){
            statusCode = 401
            throw new Error("O E-mail ainda não é cadastrado!")
        }

        const hashedPassword = registeredUser.getPassword()
        const id = registeredUser.getId()
        const role = registeredUser.getRole()

        const comparedPassword: boolean = await this.hashManager.compareHash(password, hashedPassword)

        if (!comparedPassword) {
            statusCode = 401
            throw new Error("Senha inválida!")
        }

        const token = this.authenticator.generateToken({ id: id, role: role })

        return token
    }
}