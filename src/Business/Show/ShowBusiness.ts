import { CustomError } from "../../Error/CustomError";
import { Show, showInputDTO, showOutputDTO } from "../../Model/Show";
import { Authenticator } from "../../Utilities/authenticator"
import { IdGenerator } from "../../Utilities/idGenerator"
import { ShowRepository } from "./ShowRepository";


export default class ShowBusiness {
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
            throw new Error("É necessário uma autorização!")
        }

        if (week_day !== "SEXTA" && week_day !== "SÁBADO" && week_day !== "DOMINGO") {
            throw new Error("Não haverá show neste dia!")
        }

        const tokenData = this.authenticator.getTokenData(token)

        if (!band_id || !week_day || !start_time || !end_time) {
            throw new Error("Insira todos os campos!")
        }

        if (start_time < 8 || start_time > 22) {
            throw new Error("O show não pode ser marcado nesse horário!")
        }

        if (end_time < 9 || end_time > 23) {
            throw new Error("O show não pode terminar nesse horário!")
        }

        const validateStartTime = Number.isInteger(start_time)
        const validateEndTime = Number.isInteger(end_time)

        if (validateStartTime === false) {
            throw new Error("O show não pode ser marcado nesse horário!")
        }

        if (validateEndTime === false) {
            throw new Error("O show não pode terminar nesse horário!")
        }

        const registeredStartTime = await this.showData.getShowByStartTime(start_time)
        const registeredEndTime = await this.showData.getShowByEndTime(end_time)
        console.log(registeredEndTime, registeredStartTime)

        if (registeredStartTime && !registeredEndTime) {
            throw new Error("Já existe um show marcado nesse horário")
        }

        if (!registeredStartTime && registeredEndTime) {
            throw new Error("Já existe um show que terminará nesse horário")
        }

        const validatorStartTime = registeredStartTime.getStartTime() - Number(end_time)
        const validatorEndTime = registeredEndTime.getEndTime() - Number(start_time)

        if (!registeredStartTime && !registeredEndTime) {
            const id: string = this.idGenerator.generate()
            const show = new Show(
                id,
                week_day,
                start_time,
                end_time,
                band_id
            )

            return await this.showData.insert(show)
        }

        if (registeredStartTime === undefined && registeredEndTime === undefined) {
            const id: string = this.idGenerator.generate()
            const show = new Show(
                id,
                week_day,
                start_time,
                end_time,
                band_id
            )

            return await this.showData.insert(show)
        }

        if (registeredStartTime && registeredEndTime) {
            if (validatorStartTime >= 0 && validatorEndTime
                || validatorStartTime >= 0 && validatorEndTime >= 0
            ) {
                const id: string = this.idGenerator.generate()
                const show = new Show(
                    id,
                    week_day,
                    start_time,
                    end_time,
                    band_id
                )

                return await this.showData.insert(show)

            } else if (validatorStartTime < 0 && validatorEndTime < 0) {
                throw new Error("Você não pode marcar um show neste horário!")
            }
        }
    }

    getShowByBand = async () => {

    }

    getShowByDay = async (token: string, weekDay: string): Promise<showOutputDTO[]> => {

        if (!token) {
            throw new CustomError(401, 'É necessário uma autorização!')
        }

        if (!weekDay) {
            throw new CustomError(422, "Para pesquisar shows pelo dia é necessário informar o 'weekDay' ");

        }

        if (weekDay.toLowerCase() !== 'sexta' && weekDay.toLowerCase() !== 'sábado' && weekDay.toLowerCase() !== 'domingo') {
            throw new CustomError(422, "Os dias disponíveis do shows são: SEXTA, SÁBADO ou DOMINGO");

        }

        const shows = await this.showData.getShowByDay(weekDay)

        if (shows.length < 1) {
            throw new CustomError(422, "Por enquanto, não há shows disponíveis nesse dia.");
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