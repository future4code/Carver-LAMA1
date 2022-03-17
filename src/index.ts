import { app } from "./Data/app";
import UserController from "./Controller/User/UserController";

const userController = new UserController()


app.post("/user/signup", userController.signup)
app.post("/user/login", userController.login)

