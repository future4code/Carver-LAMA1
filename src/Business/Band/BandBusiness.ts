import { CustomError } from "../../Error/CustomError";
import { Band, SignupBandInputDTO } from "../../Model/Band";
import { Authenticator } from "../../Utilities/authenticator";
import { IdGenerator } from "../../Utilities/idGenerator";
import { BandRepository } from "./BandRepository";

export default class BandBusiness {
    private idGenerator: IdGenerator;
    private authenticator: Authenticator;
    private bandData: BandRepository;

    constructor(
        bandDataImplementation: BandRepository,
    ) {
        this.bandData = bandDataImplementation
        this.idGenerator = new IdGenerator()
        this.authenticator = new Authenticator()
    }

    registerBand = async (inputHeaders: string | undefined, input: SignupBandInputDTO) => {
        const token = inputHeaders
        const { name, music_genre, responsible } = input

        if (!name || !music_genre || !responsible) {
            throw new Error("Insira todos os campos!")
        }

        if (!token || token === undefined) {
            throw new Error("É necessário uma autorização!")
        }

        const tokenData = this.authenticator.getTokenData(token)

        if (tokenData.role !== "ADMIN") {
            throw new Error("Só administradores podem criar bandas!")
        }

        const registeredBand = await this.bandData.findByName(name)

        if (registeredBand) {
            throw new Error("Já existe uma banda com este nome!")
        }

        const idBand: string = this.idGenerator.generate()

        const creator_id = tokenData.id

        const band = new Band(
            idBand,
            name,
            music_genre,
            responsible,
            creator_id
        )

        const result = await this.bandData.insert(band)
        return result
    }

    getBandById = async (token: string, id: string) => {

        if (!token) {
            throw new CustomError(401, "Para realizar essa operação é necessário ter token de autorização")
        }

        if (!id) {
            throw new CustomError(422, "Para visualizar as informações de uma banda é necesário informar o: id.")
        }

        this.authenticator.getTokenData(token)

        const band = await this.bandData.findById(id)

        if (band.length < 1) {
            throw new CustomError(404, "Banda não encontrado, por gentileza informar um id válido")
        }

        return band
    }


    getBandByName = async (token: string, name: string) => {

        if (!token) {
            throw new CustomError(401, "Para realizar essa operação é necessário ter token de autorização")
        }

        if (!name) {
            throw new CustomError(422, "Para visualizar as informações de uma banda é necesário informar o: name.")
        }

        this.authenticator.getTokenData(token)

        const band = await this.bandData.findByName2(name)

        if (band.length < 1) {
            throw new CustomError(404, "Banda não encontrado, por gentileza informar um nome válido")
        }

        return band
    }
}