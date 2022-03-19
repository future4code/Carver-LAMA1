import { BandRepository } from "../../Business/Band/BandRepository"
import { Band, ResultBandOutputDTO } from "../../Model/Band"
import BaseDatabase from "../BaseDatabase"

export default class BandData extends BaseDatabase implements BandRepository {
    protected TABLE_NAME = "Lama_Band"
    protected TABLE_NAME_SHOWS = "Lama_Shows"

    insert = async (band: Band) => {
        try {
            await BaseDatabase
                .connection(this.TABLE_NAME)
                .insert(band)

            return band

        } catch (error: any) {
            throw new Error(error.message)
        }
    }

    findByName = async (name: string): Promise<Band | undefined> => {

        try {
            const queryResult: Band[] = await BaseDatabase
                .connection(this.TABLE_NAME)
                .select()
                .where({ name })

            return queryResult[0] && Band.toUserModel(queryResult[0])
        } catch (error: any) {
            throw new Error(error.message)
        }
    }

    findById = async (id: string): Promise<ResultBandOutputDTO[] | undefined> => {

        try {
            const bandShows = await BaseDatabase
                .connection(this.TABLE_NAME_SHOWS)
                .select('week_day', 'start_time', 'end_time')
                .where('Lama_Shows.band_id', `${id}`)

            const resultMapBandShow = bandShows.map((item: any) => {
                return ({
                    day: item.week_day,
                    startTime: `${item.start_time}h`,
                    endTime: `${item.end_time}h`,
                })
            })

            const band = await BaseDatabase
                .connection(this.TABLE_NAME)
                .select()
                .where('Lama_Band.id', `${id}`)


            const result: ResultBandOutputDTO[] = band.map((item: any) => {
                return ({
                    id: item.id,
                    bandName: item.name,
                    musicaGenre: item.music_genre,
                    responsible: item.responsible,
                    shows: resultMapBandShow
                })
            })
            return result

        } catch (error: any) {
            throw new Error(error.message)
        }
    }

    findByName2 = async (name: string): Promise<ResultBandOutputDTO[] | undefined> => {

        try {
            const band = await BaseDatabase
                .connection(this.TABLE_NAME)
                .select()
                .where({ name })

            const id = band.length > 0 && band[0].id

            const bandShows = await BaseDatabase
                .connection(this.TABLE_NAME_SHOWS)
                .select('week_day', 'start_time', 'end_time')
                .where('Lama_Shows.band_id', `${id}`)

            const resultMapBandShow = bandShows.map((item: any) => {
                return ({
                    day: item.week_day,
                    startTime: `${item.start_time}h`,
                    endTime: `${item.end_time}h`,
                })
            })

            const result: ResultBandOutputDTO[] = band.map((item: any) => {
                return ({
                    id: item.id,
                    bandName: item.name,
                    musicaGenre: item.music_genre,
                    responsible: item.responsible,
                    shows: resultMapBandShow
                })
            })

            return result
        } catch (error: any) {
            throw new Error(error.message)
        }
    }

}