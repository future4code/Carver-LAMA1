import { Request, Response } from "express"
import { BandBusiness } from "../../Business/Band/BandBusiness"
import BandData from "../../Data/Band/BandData"
import { SignupBandInputDTO } from "../../Model/Band"

export default class BandController {
    private bandBusiness: BandBusiness
    constructor(

    ) {
        this.bandBusiness = new BandBusiness(new BandData())
    }

    registerBand = async (req: Request, res: Response) => {
        const token = req.headers.authorization
        const { name, music_genre, responsible } = req.body

        const input: SignupBandInputDTO = {
            name,
            music_genre,
            responsible
        }

        try {
            const band = await this.bandBusiness.registerBand(token, input)
            res.status(201).send({ message: "Banda cadastrada com sucesso!", band })

        } catch (error: any) {
            res.status(error.code || 400).send(error.message || error.sqlMessage)
        }
    }

    getBandByIdOrName = async (req: Request, res: Response) => {

        const { id, name } = req.body
        const token = req.headers.authorization as string

        try {
            if (id) {
                const band = await this.bandBusiness.getBandById(token, id)
                res.status(200).send(band)
            }

            if (name) {
                const band = await this.bandBusiness.getBandByName(token, name)
                res.status(200).send(band)
            }

        } catch (error: any) {
            res.status(error.code || 400).send(error.message || error.sqlMessage)
        }
    }
}