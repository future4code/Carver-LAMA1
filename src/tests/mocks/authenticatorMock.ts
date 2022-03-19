import { USER_ROLE } from "../../Model/User"
import { AuthenticationData } from "../../Utilities/authenticator"

export class AuthenticatorMock {
    public generate = (input: AuthenticationData): string => {
        return "token_mockado"
    }

    public verify(token: string) {
        return {
            id: "id_mockado",
            role: USER_ROLE.ADMIN
        }
    }
}