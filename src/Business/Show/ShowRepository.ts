import { Show } from "../../Model/Show"

export interface ShowRepository{
    insert(show: Show):Promise<Show>
    getAllShows(): Promise<Show[]>
    getShowByBand (bandId: string): Promise<Show>
    getShowByStartTime (startTime: number): Promise<Show[]>
    getShowByEndTime (endTime: number): Promise<Show>
    getShowByDay(weekDay: string): Promise<any>
}