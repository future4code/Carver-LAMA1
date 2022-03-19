import { ShowBusiness } from "../src/Business/Show/ShowBusiness";
import { CustomError } from "../src/Error/CustomError";
import { WEEK_DAY } from "../src/Model/Show";
import ShowDataMock from "./mocks/Show/ShowDataMock";

const showBusinessMock = new ShowBusiness(
   new ShowDataMock()
)


describe("Teste para cadastrar um novo show", () =>{

    test("Sucesso ao cadastrar um novo show", async  () =>{

        const token = "aaaaaaa"

        try {
            const input = {
                band_id: "id_mokado", 
                week_day: WEEK_DAY.DOMINGO, 
                start_time: 14,
                end_time: 17
            }

            const result = await showBusinessMock.insertShow(token, input)
            
            expect(result).toEqual({
                id: 'aaa',
                week_day: 'DOMINGO',
                start_time: 14,
                end_time: 17,
                band_id: 'id_mokado'
            })


        } catch (error) {
            if (error instanceof CustomError) {
                console.log(error.message)
            }  
        }
    })


})