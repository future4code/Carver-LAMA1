export class Band {
    constructor (
        private id: string,
        private name: string,
        private music_genre: string,
        private responsible: string,
    ){
        this.id = id;
        this.name = name;
        this.music_genre = music_genre;
        this.responsible = responsible;
    }

        public getId() {
            return this.id
        }
    
        public getName() {
            return this.name
        }
    
        public getMusicGenre() {
            return this.music_genre
        }
    
        public getResponsible() {
            return this.responsible
        }
        
        static toUserModel(data: any): Band {
            return new Band(data.id, data.name, data.music_genre, data.responsible)
        }
}

export type SignupBandInputDTO = {
    name: string,
    music_genre: string,
    responsible: string
}