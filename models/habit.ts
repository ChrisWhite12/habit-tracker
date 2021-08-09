class Habit {
	public id: any;
	public habitName: any;
	public dateStart: any;
	public highStreak: any;
	public actId: any;

    constructor(id: string, habitName: string, dateStart: string, highStreak: string){
        this.id = id
        this.habitName = habitName
        this.dateStart = dateStart
        this.highStreak = highStreak
        this.actId = ''
    }
}

export default Habit