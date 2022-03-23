import { Show, WEEK_DAY } from "../../../src/Model/Show";
import { show1, show2 } from "./ShowMock";
import { ShowRepositoryMock } from "./ShowRepositoryMock";

export default class ShowDataMock  implements ShowRepositoryMock {

    protected TABLE_NAME = "Lama_Shows"
    protected TABLE_NAME_BAND = "Lama_Band"

    insert = async (show: Show) => {
        return show
    }

    getShowByDay = async (weekDay: string) => {

        if(weekDay === WEEK_DAY.DOMINGO){
            return show1
        }
        if(weekDay === WEEK_DAY.SEXTA){
            return show2
        }
        else{
            return undefined
        }
    }

}
