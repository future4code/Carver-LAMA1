import express from "express"
import BandController from "../Controller/Band/BandController"

export const bandRouter = express.Router()

const bandController = new BandController()

bandRouter.get('/', bandController.getBandByIdOrName)
bandRouter.post('/add', bandController.registerBand)


