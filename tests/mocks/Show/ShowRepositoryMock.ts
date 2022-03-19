import { Show } from "../../../src/Model/Show"

export interface ShowRepositoryMock{
    insert(show: Show):Promise<Show>
    getShowByDay(weekDay: string): Promise<any>
}