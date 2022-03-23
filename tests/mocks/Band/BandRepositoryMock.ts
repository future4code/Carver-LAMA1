import { Band, ResultBandOutputDTO } from "../../../src/Model/Band";

export interface BandRepositoryMock {
    insert(band: Band): Promise<Band>
    findByName(name: string): Promise<Band | undefined>
    findById(id: string):Promise<ResultBandOutputDTO[] | undefined>
    findByName2(name: string): Promise<ResultBandOutputDTO[] | undefined>
}