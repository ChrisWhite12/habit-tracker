class Exercise {
	public id: any;
	public exerciseName: any;
	public cal: any;
	public date: any;
	public actId: any;

    constructor(id: string, exerciseName: string, cal: string, date: string, actId: string){
        this.id = id
        this.exerciseName = exerciseName
        this.cal = cal
        this.date = date
        this.actId = actId
    }
}

export default Exercise