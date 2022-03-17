import { Band } from "../../Model/Band";

export interface BandRepository{
    insert(band: Band):Promise<Band>
    findByName(name: string):Promise<Band>
}