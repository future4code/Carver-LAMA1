import { CustomError } from "../../Error/CustomError";
import { Show, showInputDTO, showOutputDTO } from "../../Model/Show";
import { Authenticator } from "../../Utilities/authenticator"
import { IdGenerator } from "../../Utilities/idGenerator"
import { ShowRepository } from "./ShowRepository";

export class ShowBusiness {
    private idGenerator: IdGenerator;
    private authenticator: Authenticator;
    private showData: ShowRepository

    constructor(
        showDataImplementation: ShowRepository
    ) {
        this.showData = showDataImplementation
        this.idGenerator = new IdGenerator()
        this.authenticator = new Authenticator()
    }

    insertShow = async (inputHeaders: string | undefined, input: showInputDTO) => {
        const token = inputHeaders
        const { band_id, week_day, start_time, end_time } = input

        if (!token || token === undefined) {
            throw new CustomError(401, "Para realizar essa operação é necessário ter token de autorização.")
        }

        if (week_day !== "SEXTA" && week_day !== "SÁBADO" && week_day !== "DOMINGO") {
            throw new CustomError(422, "Os shows devem ser agendados entre os dias: 'SEXTA', 'SÁBADO' ou 'DOMINGO'.")
        }

        const tokenValidation = this.authenticator.getTokenData(token)

        if (tokenValidation.role !== "ADMIN") {
            throw new CustomError(403, "Desculpe,você não tem permissão para acessar essa área.")
        }

        if (!band_id || !week_day || !start_time || !end_time) {
            throw new CustomError(422, "Para cadastrar uma novo show é necessário informar os seguintes campos: 'bando_id', 'week_day', 'start_time', 'end_time.")
        }

        if (start_time < 8 || start_time > 22) {
            throw new CustomError(422, "Os shows devem iniciar entre 08h até às 22h.")
        }

        if (end_time < 9 || end_time > 23) {
            throw new CustomError(422, "Os shows devem acabar entre 09h até às 23h.")
        }

        if (end_time < start_time) {
            throw new CustomError(422, "Esse horário não é válido!")
        }

        const validateStartTime = Number.isInteger(start_time)
        const validateEndTime = Number.isInteger(end_time)

        if (validateStartTime === false) {
            throw new CustomError(422, "O show não pode ser marcado nesse horário!")
        }

        if (validateEndTime === false) {
            throw new CustomError(422, "O show não pode terminar nesse horário!")
        }

        const horaShows = await this.showData.getShowByDay(week_day)

        for (let initialTime of horaShows) {
            for (var i = initialTime.start_time; i < initialTime.end_time; i++) {
                if (start_time === i) {
                    throw new CustomError(409, 'já existe show cadastrado no horário deste dia')
                }
                if (end_time === initialTime.end_time) {
                    throw new CustomError(409, 'já existe show cadastrado no horário deste dia')
                }
            }
        }

        const id: string = this.idGenerator.generate()
        const show = new Show(
            id,
            week_day,
            start_time,
            end_time,
            band_id
        )

        const result = await this.showData.insert(show)
        return result
    }

    getShowByDay = async (token: string, weekDay: string): Promise<showOutputDTO[]> => {

        if (!token) {
            throw new CustomError(401, 'É necessário uma autorização!')
        }

        if (!weekDay) {
            throw new CustomError(422, "Para pesquisar shows pelo dia é necessário informar o 'weekDay' ")
        }

        if (weekDay.toLowerCase() !== 'sexta' && weekDay.toLowerCase() !== 'sábado' && weekDay.toLowerCase() !== 'domingo') {
            throw new CustomError(422, "Os dias disponíveis do shows são: SEXTA, SÁBADO ou DOMINGO")
        }

        const shows = await this.showData.getShowByDay(weekDay)

        if (shows.length < 1) {
            throw new CustomError(422, "Por enquanto, não há shows disponíveis nesse dia.")
        }

        const result = shows.map((item: any) => {
            return ({
                Band: item.name,
                musicGenre: item.music_genre
            })
        })

        return result
    }
}