export class Band {
    constructor(
        private id: string,
        private name: string,
        private music_genre: string,
        private responsible: string,
        private creator_id: string
    ) {
        this.id = id;
        this.name = name;
        this.music_genre = music_genre;
        this.responsible = responsible;
        this.creator_id = creator_id;
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

    public getCreatorId() {
        return this.creator_id
    }

    static toUserModel(data: any): Band {
        return new Band(data.id, data.name, data.music_genre, data.responsible, data.creator_id)
    }
}

export type SignupBandInputDTO = {
    name: string,
    music_genre: string,
    responsible: string
}

export type ResultBandOutputDTO = {
    id: string,
    bandName: string,
    musicaGenre: string,
    responsible: string,
    shows: object[]
}