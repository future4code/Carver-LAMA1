import { Show } from "../../Model/Show"

export interface ShowRepository{
    insert(show: Show):Promise<void>
    getAllShows(): Promise<Show[]>
    getShowByBand (bandId: string): Promise<Show>
}