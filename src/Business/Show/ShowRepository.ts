import { Show } from "../../Model/Show"

export interface ShowRepository{
    insert(show: Show):Promise<Show>
    getAllShows(): Promise<Show[]>
    getShowByBand (bandId: string): Promise<Show>
    getShowByDay(weekDay: string): Promise<any>
}