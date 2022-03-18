import { Band, ResultBandOutputDTO } from "../../Model/Band";

export interface BandRepository {
    insert(band: Band): Promise<Band>
    findByName(name: string): Promise<Band>
    findById(id: string): Promise<ResultBandOutputDTO[]>
    findByName2(name: string): Promise<ResultBandOutputDTO[]>
}