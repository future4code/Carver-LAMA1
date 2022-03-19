import { app } from "./Data/app"
import { bandRouter } from "./router/BandRouter"
import { showRouter } from "./router/ShowRouter"
import { userRouter } from "./router/UserRouter"

app.use('/user', userRouter)
app.use('/band', bandRouter)
app.use('/show', showRouter)
