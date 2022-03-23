import { Band, ResultBandOutputDTO } from "../../../src/Model/Band"
import { bandMock, bandMock2, bandMock3, bandMock4 } from "./bandMock"
import { BandRepositoryMock } from "./BandRepositoryMock"


export default class BandDataMock implements BandRepositoryMock{
    protected TABLE_NAME = "Lama_Band"
    protected TABLE_NAME_SHOWS = "Lama_Shows"

    insert = async (band: Band):Promise<Band> => {
        return band
    }

    findByName = async (name: string): Promise<Band | undefined> => {
        if(name === "Guns"){
            return bandMock
        }
        if(name === "Skank"){
            return bandMock2
        } else {
            undefined
        }
    }

    findById = async (id: string): Promise<ResultBandOutputDTO[] | undefined> => {
        if(id === "oi"){
            return bandMock3
        }
        if(id === "oi2"){
            return bandMock4
        }else{
            undefined
        }
    }

    findByName2 = async (name: string): Promise<ResultBandOutputDTO[]| undefined> => {
        if(name === "banda1"){
            return bandMock3
        }
        if(name === "banda2"){
            return bandMock4
        }else{
            undefined
        }
    }

}