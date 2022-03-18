import { Request, Response } from "express";
import ShowBusiness from "../../Business/Show/ShowBusiness";
import ShowData from "../../Data/Shows/ShowsData";
import { showInputDTO } from "../../Model/Show";

export default class ShowController {
    private showBusiness: ShowBusiness
    constructor() {
        this.showBusiness = new ShowBusiness(new ShowData())
    }

    registerShow = async (req: Request, res: Response) => {
        const token = req.headers.authorization
        const { band_id, week_day, start_time, end_time } = req.body

        const input: showInputDTO = {
            band_id,
            week_day,
            start_time,
            end_time
        }

        try {
            const band = await this.showBusiness.insertShow(token, input)
            res.send({ message: "Show cadastrado com sucesso!", band })
        } catch (error: any) {
            res.statusCode = 400
            let message = error.sqlMessage || error.message
            res.send({ message })
        }
    }

    getShowByBand = async (req: Request, res: Response) => {

        try {

        } catch (error) {

        }

    }

    getShowByDay = async (req: Request, res: Response) => {
        const token = req.headers.authorization as string
        const { weekDay } = req.body

        try {

            const shows = await this.showBusiness.getShowByDay(token, weekDay)
            res.status(200).send(shows)

        } catch (error: any) {
            res.statusCode = 400
            let message = error.sqlMessage || error.message
            res.send({ message })
        }
    }


}