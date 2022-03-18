import { ShowRepository } from "../../Business/Show/ShowRepository";
import { Show } from "../../Model/Show";
import BaseDatabase from "../BaseDatabase"

export default class ShowData extends BaseDatabase implements ShowRepository {
    protected TABLE_NAME = "Lama_Shows"
    protected TABLE_NAME_BAND = "Lama_Band"

    insert = async (show: Show) => {
        try {
            await BaseDatabase
                .connection(this.TABLE_NAME)
                .insert(show)
            return show

        } catch (error: any) {
            throw new Error("Erro ao criar usuário no banco de dados!")
        }
    }

    getAllShows = async () => {

        try {
            const shows: Show[] = await BaseDatabase
                .connection(this.TABLE_NAME)
                .select()

            return shows

        } catch (error: any) {
            throw new Error(error.message)
        }
    }

    getShowByBand = async (bandId: string) => {

        try {
            const show: Show[] = await BaseDatabase
                .connection(this.TABLE_NAME)
                .select()
                .where('band_id', `${bandId}`)

            return show && Show.toShowModel(show)
        } catch (error: any) {
            throw new Error(error.message)
        }
    }

    getShowByStartTime = async (startTime: number) => {
        try {
            const show: Show[] = await BaseDatabase
                .connection(this.TABLE_NAME)
                .select()
                .where('start_time', `${startTime}`)
               
            return show
        } catch (error: any) {
            throw new Error(error.message)
        }
    }

    getShowByEndTime = async (endTime: number) => {
        try {
            const show: Show[] = await BaseDatabase
                .connection(this.TABLE_NAME)
                .select()
                .where('end_time', `${endTime}`)
               
            return show[0] && Show.toShowModel(show[0])
        } catch (error: any) {
            throw new Error(error.message)
        }
    }

    getShowByDay = async (weekDay: string) => {
        try {
            const shows: any = await BaseDatabase
                .connection(this.TABLE_NAME)
                .select()
                .innerJoin(this.TABLE_NAME_BAND, 'Lama_Band.id', 'Lama_Shows.band_id')
                .where('week_day', `${weekDay}`)

            return shows

        } catch (error: any) {
            throw new Error(error.message)
        }
    }
}