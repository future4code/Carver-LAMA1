import { USER_ROLE } from "../../../src/Model/User"
import { AuthenticationData } from "../../../src/Utilities/authenticator"

export class AuthenticatorMock {
    public generate = (input: AuthenticationData): string => {
        return "token_mockado"
    }

    public verify = (token: string): AuthenticationData => {
        return {
            id: "id_mockado",
            role: USER_ROLE.ADMIN
        }
    }
}