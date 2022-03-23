import { Show } from "../../Model/Show"

export interface ShowRepository {
    insert(show: Show): Promise<Show>
    getShowByDay(weekDay: string): Promise<any>
}