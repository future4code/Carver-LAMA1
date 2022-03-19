import { Band } from "../../Model/Band";

export interface BandRepositoryMock {
    insert(band: Band): Promise<Band>
    findByName(name: string): Promise<Band | undefined>
    findById(id: string):Promise<Band | undefined>
    findByName2(name: string): Promise<Band | undefined>
}