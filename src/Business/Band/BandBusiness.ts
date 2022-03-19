import { CustomError } from "../../Error/CustomError";
import { Band, ResultBandOutputDTO, SignupBandInputDTO } from "../../Model/Band";
import { Authenticator } from "../../Utilities/authenticator";
import { IdGenerator } from "../../Utilities/idGenerator";
import { BandRepository } from "./BandRepository";

export class BandBusiness {
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
            throw new CustomError(422, "Para cadastrar uma nova banda, é necessário informar os seguintes campos: 'name', 'music_genre', 'responsible'.")

        }

        if (!token || token === undefined) {
            throw new CustomError(401, "Para realizar essa operação é necessário ter token de autorização.")
        }

        const tokenData = this.authenticator.getTokenData(token)

        if (tokenData.role !== "ADMIN") {
            throw new CustomError(401, "Só administradores podem criar bandas!")
        }

        const registeredBand = await this.bandData.findByName(name)

        if (registeredBand) {
            throw new CustomError(422, "Já existe uma banda com este nome!")
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

    getBandById = async (token: string, id: string): Promise<ResultBandOutputDTO[]> => {

        if (!token) {
            throw new CustomError(401, "Para realizar essa operação é necessário ter token de autorização")
        }

        if (!id) {
            throw new CustomError(422, "Para visualizar as informações de uma banda é necesário informar o: id.")
        }

        this.authenticator.getTokenData(token)

        const band = await this.bandData.findById(id)

        if (band === undefined) {
            throw new CustomError(404, "Banda não encontrado, por gentileza informar um id válido.")
        }

        return band
    }


    getBandByName = async (token: string, name: string): Promise<ResultBandOutputDTO[]>=> {

        if (!token) {
            throw new CustomError(401, "Para realizar essa operação é necessário ter token de autorização")
        }

        if (!name) {
            throw new CustomError(422, "Para visualizar as informações de uma banda é necesário informar o: name.")
        }

        this.authenticator.getTokenData(token)

        const band = await this.bandData.findByName2(name)

        if (band === undefined) {
            throw new CustomError(404, "Banda não encontrado, por gentileza informar um nome válido")
        }

        return band
    }
}