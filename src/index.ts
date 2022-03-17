import { app } from "./Data/app";
import UserController from "./Controller/User/UserController";
import BandController from "./Controller/Band/BandController";

const userController = new UserController()
const bandController = new BandController()

app.post("/user/signup", userController.signup)
app.post("/user/login", userController.login)

app.post("/band/create", bandController.registerBand)
