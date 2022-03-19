import BandBusiness from "../Business/Band/BandBusiness"
import { SignupBandInputDTO } from "../Model/Band"
import BandDataMock from "./mocks/BandDataMock"
import { BandRepositoryMock } from "./mocks/BandRepositoryMock"

const bandBusiness = new BandBusiness(
    new BandDataMock() as BandRepositoryMock
)

describe("findByName", () => {
    test("Deve retornar erro quando dois nomes são iguais", async () => {
     expect.assertions(2)
     try {
       await bandBusiness.registerBand
     } catch (error:any) {
        console.log(error.message)
        expect(error.statusCode).toBe(404)
        expect(error.message).toBe("User not found")
     }
   })

   test("Deve retornar sucesso ao criar a banda", async () => {
    expect.assertions(2)
    try {
        const input: SignupBandInputDTO = ({
            name: "abc",
            music_genre: "pagode",
            responsible: "kiko"
        })
      await bandBusiness.registerBand("123", input)
    } catch (error:any) {
       console.log(error.message)
       expect(error.statusCode).toBe(404)
       expect(error.message).toBe("User not found")
    }
  })
 
   test("Deve retornar banda criada", async () => {
     expect.assertions(0)
 
     try {
       const getUserById = jest.fn(
        (id: string) => bandBusinessMock.
       )
 
       const result = await getUserById("id_mock_admin")
 
       expect(getUserById).toHaveBeenCalledWith("id_mock_admin")
       expect(result).toEqual({
         id: "id_mock_admin",
         name: "astrodev",
         email: "astrodev@gmail.com",
         role: "ADMIN",
       })
 
     } catch (error) {
         if(error instanceof CustomError){
             console.log(error.message)
         }
     }
   })
 })