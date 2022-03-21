export class User {
    constructor(
        private id: string,
        private name: string,
        private email: string,
        private password: string,
        private role: USER_ROLE
    ) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role
    }

    public getId() {
        return this.id
    }

    public getName() {
        return this.name
    }

    public getEmail() {
        return this.email
    }

    public getPassword() {
        return this.password
    }

    public getRole() {
        return this.role
    }

    static toUserModel(data: any): User {
        return new User(data.id, data.name, data.email, data.password, data.role)
    }
}

export type SignupInputDTO = {
    name: string
    email: string
    password: string
    role: USER_ROLE
}

export enum USER_ROLE {
    NORMAL = "NORMAL",
    ADMIN = "ADMIN"
}

export type LoginInputDTO = {
    email: string
    password: string
}

export type user = {
    id: string,
    name: string,
    email: string,
    password: string
}