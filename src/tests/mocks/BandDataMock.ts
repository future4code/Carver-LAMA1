import { Band } from "../../Model/Band"
import { bandMock, bandMock2 } from "./bandMock"
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

    findById = async (id: string): Promise<Band | undefined> => {
        if(id === "id_mockado"){
            return bandMock
        }
        if(id === "id_mockado2"){
            return bandMock2
        }else{
            undefined
        }
    }

    findByName2 = async (name: string): Promise<Band | undefined> => {
        if(name === "Guns"){
            return bandMock
        }
        if(name === "Skank"){
            return bandMock2
        }else{
            undefined
        }
    }

}