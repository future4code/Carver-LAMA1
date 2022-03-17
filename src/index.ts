import { app } from "./Data/app";
import UserController from "./Controller/User/UserController";
import BandController from "./Controller/Band/BandController";

const userController = new UserController()
const bandController = new BandController()

app.post("/user/signup", userController.signup)
app.post("/user/login", userController.login)

<<<<<<< HEAD
=======
app.post("/band/create", bandController.registerBand)
>>>>>>> 1da1f89d96e8f32fdc31cc855420403d139c3786
