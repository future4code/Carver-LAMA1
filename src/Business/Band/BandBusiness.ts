import { Band, SignupBandInputDTO } from "../../Model/Band";
import { Authenticator } from "../../Utilities/authenticator";
import { IdGenerator } from "../../Utilities/idGenerator";
import { BandRepository } from "./BandRepository";

export default class BandBusiness {
    private idGenerator: IdGenerator;
    private authenticator: Authenticator;
    private bandData: BandRepository;

    constructor(
        bandDataImplementation: BandRepository
    ){
        this.bandData = bandDataImplementation
        this.idGenerator = new IdGenerator()
        this.authenticator = new Authenticator()
    }

    registerBand = async (inputHeaders: string | undefined, input: SignupBandInputDTO) => {
        const token = inputHeaders
        const {name, music_genre, responsible} = input
        
        if(!name || !music_genre || !responsible){
            throw new Error("Insira todos os campos!")
        }

        if(!token || token === undefined){
            throw new Error("É necessário uma autorização!")
        }

        const tokenData = this.authenticator.getTokenData(token)

        const registeredBand = await this.bandData.findByName(name)

        if(registeredBand){
            throw new Error("Já existe uma banda com este nome!")
        }

        const registeredUser = await this.userData.getUserByid(tokenData.id)

        if(registeredUser.role !== USER_ROLES.ADMIN) {
            throw new Error("Apenas administradores podem registrar uma banda")
        }

        const idBand: string = this.idGenerator.generate()

        const band = new Band(
            idBand,
            name,
            music_genre,
            responsible
        )

        const result = await this.bandData.insert(band)
        return result
    }
}