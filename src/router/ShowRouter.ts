import express from "express"
import ShowController from "../Controller/Show/ShowController"

export const showRouter = express.Router()

const showController = new ShowController()

showRouter.get('/week-day', showController.getShowByDay)
showRouter.post('/add', showController.registerShow)

