import { app } from "./Data/app";
import UserController from "./Controller/User/UserController";
import BandController from "./Controller/Band/BandController";
import ShowController from "./Controller/Show/ShowController";

const userController = new UserController()
const bandController = new BandController()
const showController = new ShowController()

app.post("/user/signup", userController.signup)
app.post("/user/login", userController.login)

app.post("/band/create", bandController.registerBand)

app.get("/show/weekDay", showController.getShowByDay)
app.post("/show/create", showController.registerShow)

app.get("/band", bandController.getBandByIdOrName)


