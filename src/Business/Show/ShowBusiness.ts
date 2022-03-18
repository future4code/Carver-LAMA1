import { Show, showInputDTO } from "../../Model/Show";
import { Authenticator } from "../../Utilities/authenticator"
import { IdGenerator } from "../../Utilities/idGenerator"
import { ShowRepository } from "./ShowRepository";


export default class ShowBusiness {
    private idGenerator: IdGenerator;
    private authenticator: Authenticator;
    private showData: ShowRepository

    constructor(
        showDataImplementation: ShowRepository
    ){
        this.showData = showDataImplementation
        this.idGenerator = new IdGenerator()
        this.authenticator = new Authenticator()
    }

    insertShow = async (inputHeaders: string | undefined, input: showInputDTO) => {
        const token = inputHeaders
        const {band_id, week_day, start_time, end_time} = input

        if (!token || token === undefined) {
            throw new Error("É necessário uma autorização!")
        }

        if(week_day !== "SEXTA" && week_day !== "SÁBADO" && week_day !== "DOMINGO"){
            throw new Error("Não haverá show neste dia!")
        }

        this.authenticator.getTokenData(token)

        if(!band_id || !week_day || !start_time || !end_time){
            throw new Error("Insira todos os campos!")
        }

        if(start_time < 8 || start_time > 22){
            throw new Error("O show não pode ser marcado nesse horário!")
        }

        if(end_time < 9 || end_time > 23){
            throw new Error("O show não pode terminar nesse horário!")
        }

        if(end_time < start_time){
            throw new Error("Esse horário não é válido!")
        }

        const validateStartTime = Number.isInteger(start_time)
        const validateEndTime = Number.isInteger(end_time)

        if(validateStartTime === false){
            throw new Error("O show não pode ser marcado nesse horário!")
        }

        if(validateEndTime === false){
            throw new Error("O show não pode terminar nesse horário!")
        }

        const searchStartTime = await this.showData.getShowByStartTime(start_time)  
        
        const startTime = searchStartTime.getStartTime()
        const endTime = searchStartTime.getEndTime()


        if(startTime === start_time){
            throw new Error("O show não pode ser marcado nesse horário!")
        } else if (endTime === end_time){
            throw new Error("O show não pode ser marcado nesse horário!")
        } else if(startTime < start_time && endTime > end_time){
            throw new Error("O show não pode ser marcado nesse horário!")
        } else if(startTime > start_time && endTime < end_time) {
            throw new Error("O show não pode ser marcado nesse horário!")
        } else if(startTime < start_time && endTime < end_time){
            throw new Error("O show não pode ser marcado nesse horário!")
        } else if(startTime < start_time && endTime > end_time){
            throw new Error("O show não pode ser marcado nesse horário!")
        }else if(startTime > start_time && startTime > end_time && endTime > end_time && endTime > start_time){
            if(!startTime && !endTime){
                const id:string = this.idGenerator.generate()
                const show = new Show(
                    id,
                    week_day,
                    start_time,
                    end_time,
                    band_id
                )
                    
            return await this.showData.insert(show)
            } 
        } else if (startTime < start_time && startTime < end_time && endTime < end_time && endTime < start_time){
            if(!startTime && !endTime){
                const id:string = this.idGenerator.generate()
                const show = new Show(
                    id,
                    week_day,
                    start_time,
                    end_time,
                    band_id
                )
                    
            return await this.showData.insert(show)
            }
        } else if (startTime === undefined && endTime === undefined){
            const id:string = this.idGenerator.generate()
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

    getShowByBand = async()=>{

    }
}