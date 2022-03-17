import { Request, Response } from "express"
import BandBusiness from "../../Business/Band/BandBusiness"
import BandData from "../../Data/Band/BandData"
import { SignupBandInputDTO } from "../../Model/Band"

export default class BandController {
    private bandBusiness: BandBusiness
    constructor(

    ){
        this.bandBusiness = new BandBusiness(new BandData())
    }

    registerBand = async (req: Request, res: Response) => {
        const token = req.headers.authorization
        const {name, music_genre, responsible} = req.body

        const input: SignupBandInputDTO = {
            name,
            music_genre,
            responsible
        }

        try {
            const band = await this.bandBusiness.registerBand(token, input)
            res.send({message: "Banda cadastrada com sucesso!", band})
        } catch (error:any) {
            res.statusCode = 400
            let message = error.sqlMessage || error.message
            res.send({ message })
        }
    }
}