
export const verifyTime = (time: number) => {
    if(time < 8 && time > 22){
        return "O show não pode ser marcado nesse horário!"
    }
}