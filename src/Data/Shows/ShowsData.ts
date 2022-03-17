import { ShowRepository } from "../../Business/Show/ShowRepository";
import { Show } from "../../Model/Show";
import BaseDatabase from "../BaseDatabase"

export default class ShowData extends BaseDatabase implements ShowRepository {
    protected TABLE_NAME = "Lama_Shows"

    insert = async () => {

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

}