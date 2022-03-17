import { BandRepository } from "../../Business/Band/BandRepository"
import { Band } from "../../Model/Band"
import BaseDatabase from "../BaseDatabase"

export default class BandData extends BaseDatabase implements BandRepository {
    protected TABLE_NAME = "Lama_Band"

    insert = async (band:Band) => {
        try {
            await BaseDatabase
            .connection(this.TABLE_NAME)
            .insert(band)

            return band
        } catch (error:any) {
            throw new Error(error.message)
        }
    }

    findByName = async (name:string) =>{
        try {
            const queryResult: Band[] = await BaseDatabase
            .connection(this.TABLE_NAME)
            .select()
            .where({name})

            return queryResult[0] && Band.toUserModel(queryResult[0])
        } catch (error:any) {
            throw new Error(error.message)
        }
    }
}