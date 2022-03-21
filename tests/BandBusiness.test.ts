import { BandBusiness } from "../src/Business/Band/BandBusiness"
import { CustomError } from "../src/Error/CustomError"
import BandDataMock from "./mocks/Band/BandDataMock"

const bandBusinessMock = new BandBusiness(
    new BandDataMock() 
)

describe('teste ao cadastrar banda', () =>{

  test("erro ao passar o nome da banda vázio", async () =>{
    expect.assertions(2)
    const input = ({
      name: "",
      music_genre: "pagode",
      responsible: "kiko"
  })
    const token = "oiiiiiiii"

    try {
      await bandBusinessMock.registerBand(token, input )

    } catch (error) {
        if (error instanceof CustomError) { 
          console.log(error.message)
          expect(error.code).toBe(422)
          expect(error.message).toBe("Para cadastrar uma nova banda, é necessário informar os seguintes campos: 'name', 'music_genre', 'responsible'.")
        }
      }

  })

  test("Sucesso ao cadastrar uma banda, passando todos os dados necessários", async () =>{
    expect.assertions

    const input = ({
      name: "Isadora Pompeo",
      music_genre: "Gospel",
      responsible: "Isadora"
  })
  
  const token = "oiiiiiiii"

  try {
    const band = await bandBusinessMock.registerBand(token, input)
    expect(band).toEqual(
    { name: "Isadora Pompeo",
    music_genre: "Gospel",
    responsible: "Isadora"}
    )
    
  } catch (error) {
      if (error instanceof CustomError) {
        console.log(error.message)
      }
    }
  
  })
})



