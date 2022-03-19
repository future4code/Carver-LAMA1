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



// describe("findByName", () => {
//   //   test("Deve retornar erro quando dois nomes são iguais", async () => {


//   //    expect.assertions(2)
//   //    try {
//   //      await bandBusiness.registerBand


//   //    } catch (error:any) {
//   //       console.log(error.message)
//   //       expect(error.statusCode).toBe(404)
//   //       expect(error.message).toBe("User not found")
//   //    }
//   //  })

//   //  test("Deve retornar sucesso ao criar a banda", async () => {
//   //   expect.assertions(2)
//   //   try {
//   //       const input: SignupBandInputDTO = ({
//   //           name: "abc",
//   //           music_genre: "pagode",
//   //           responsible: "kiko"
//   //       })
//   //     await bandBusiness.registerBand("123", input)
//   //   } catch (error:any) {
//   //      console.log(error.message)
//   //      expect(error.statusCode).toBe(404)
//   //      expect(error.message).toBe("User not found")
//   //   }
//   // })
 
//    test("Deve retornar banda criada", async () => {
//      expect.assertions(0)
 
//      try {
//        const getUserById = jest.fn(
//         (id: string) => bandBusiness.
//        )
 
//        const result = await getUserById("id_mock_admin")
 
//        expect(getUserById).toHaveBeenCalledWith("id_mock_admin")
//        expect(result).toEqual({
//          id: "id_mock_admin",
//          name: "astrodev",
//          email: "astrodev@gmail.com",
//          role: "ADMIN",
//        })
 
//      } catch (error) {
//          if(error instanceof CustomError){
//              console.log(error.message)
//          }
//      }
//    })
//  })