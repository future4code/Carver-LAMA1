import { Band, ResultBandOutputDTO } from "../../Model/Band"

export interface BandRepository {
    insert(band: Band): Promise<Band>
    findByName(name: string): Promise<Band | undefined>
    findById(id: string): Promise<ResultBandOutputDTO[] | undefined>
    findByName2(name: string): Promise<ResultBandOutputDTO[] | undefined>
}