export enum WEEK_DAY {
    SEXTA = "SEXTA",
    SABADO = "SABADO",
    DOMINGO = "DOMINGO"
}

export class Show {
    constructor (
        private id: string,
        private weekDay: WEEK_DAY,
        private startTime: number,
        private endTime: number,
        private bandId: string
    ){
        this.id = id;
        this.weekDay = weekDay;
        this.startTime = startTime;
        this.endTime = endTime;
        this.bandId = bandId
    }

        public getId() {
            return this.id
        }
    
        public getWeekDay() {
            return this.weekDay
        }
    
        public getStartTime() {
            return this.startTime
        }
    
        public getEndTime() {
            return this.endTime
        }

        public getBandId() {
            return this.bandId
        }
    
        static toShowModel(data: any): Show {
            return new Show(data.id, data.weekDay, data.startTime, data.endTime, data.bandId)
        }
}


