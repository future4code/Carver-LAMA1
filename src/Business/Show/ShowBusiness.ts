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

        this.authenticator.getTokenData(token)

        if (!band_id || !week_day || !start_time || !end_time) {
            throw new Error("Insira todos os campos!")
        }

        if (start_time < 8 || start_time > 22) {
            throw new Error("O show não pode ser marcado nesse horário!")
        }

        if (end_time < 9 || end_time > 23) {
            throw new Error("O show não pode terminar nesse horário!")
        }

        if(end_time < start_time){
            throw new Error("Esse horário não é válido!")
        }

        const validateStartTime = Number.isInteger(start_time)
        const validateEndTime = Number.isInteger(end_time)

        if (validateStartTime === false) {
            throw new Error("O show não pode ser marcado nesse horário!")
        }

        if (validateEndTime === false) {
            throw new Error("O show não pode terminar nesse horário!")
        }

        const searchStartTime = await this.showData.getShowByStartTime(start_time)
        const searchEndTime = await this.showData.getShowByEndTime(end_time)   

        console.log(searchEndTime, searchStartTime)
        
        const startTime = searchStartTime.getStartTime()
        const endTime = searchEndTime.getEndTime()

        console.log(startTime, endTime)
        
        if (searchEndTime === undefined && searchStartTime === undefined) {
            if (startTime < start_time || endTime > end_time) {
                throw new Error("O show não pode ser marcado nesse horário!")
            }
            if (startTime < start_time && endTime > end_time) {
                throw new Error("O show não pode ser marcado nesse horário!")
            }
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

        if (startTime < start_time || endTime > end_time) {
            throw new Error("O show não pode ser marcado nesse horário!")
        }
        if (searchEndTime && searchStartTime === undefined) {
            throw new Error("O show não pode ser marcado nesse horário!")
        } else if (searchEndTime === undefined && searchStartTime) {
            throw new Error("O show não pode ser marcado nesse horário!")
        }
        if (startTime === start_time) {
            throw new Error("O show não pode ser marcado nesse horário!")
        } else if (endTime === end_time) {
            throw new Error("O show não pode ser marcado nesse horário!")
        }
        if (startTime > start_time && endTime < end_time) {
            throw new Error("O show não pode ser marcado nesse horário!")
        }
        if (startTime < start_time && endTime < end_time) {
            throw new Error("O show não pode ser marcado nesse horário!")
        }
        if (startTime > start_time && startTime > end_time && endTime > end_time && endTime > start_time) {
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
        if (startTime < start_time && startTime < end_time && endTime < end_time && endTime < start_time) {

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