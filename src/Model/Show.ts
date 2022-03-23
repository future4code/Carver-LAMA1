import e from "express";

export enum WEEK_DAY {
    SEXTA = "SEXTA",
    SÁBADO = "SÁBADO",
    DOMINGO = "DOMINGO"
}

export class Show {
    constructor(
        private id: string,
        private week_day: WEEK_DAY,
        private start_time: number,
        private end_time: number,
        private band_id: string,
    ) {
        this.id = id;
        this.week_day = week_day;
        this.start_time = start_time;
        this.end_time = end_time;
        this.band_id = band_id
    }

    public getId() {
        return this.id
    }

    public getWeekDay() {
        return this.week_day
    }

    public getStartTime() {
        return this.start_time
    }

    public getEndTime() {
        return this.end_time
    }

    public getBandId() {
        return this.band_id
    }

    static toShowModel(data: any): Show {
        return new Show(data.id, data.week_day, data.start_time, data.end_time, data.band_id)
    }
}

export type showInputDTO = {
    band_id: string,
    week_day: WEEK_DAY,
    start_time: number,
    end_time: number
}

export type showOutputDTO = {
    Band: string,
    musicGenre: string,
}