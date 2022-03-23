import { Band, ResultBandOutputDTO } from "../../../src/Model/Band"


export const bandMock = new Band(
    "id_mockado",
    "Guns",
    "Rock",
    "Axel",
    "idCreator"
)

export const bandMock2 = new Band(
    "id_mockado2",
    "Skank",
    "Rock",
    "Samuel",
    "idCreator2"
)

export const bandMock3: ResultBandOutputDTO[] = [
  {
    id: "oi",
    bandName: "banda1",
    musicaGenre: "gospel",
    responsible: "Ana",
    shows:[]

  }
]

export const bandMock4: ResultBandOutputDTO[] = [
    {
      id: "oi2",
      bandName: "banda2",
      musicaGenre: "gospel2",
      responsible: "Ana2",
      shows:[]
  
    }
  ]