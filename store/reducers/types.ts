export type ReducerStateType = {
    activity: ActivityItem
    exercise: ExerciseItem
    weight: WeightItem
    habit: HabitItem
    auth: AuthItem,
    profile: ProfileItem 

}

export type ActivityItem = {
    activityList: {
        id: string, 
        date: string, 
        exerIds: string[], 
        habitIds: string[]
    }[]
}

export type ExerciseItem = {
    exerciseList: {
        id: string,
        exerciseName: string,
        cal: string,
        date: string,
        actId: string
    }[]
}

export type HabitItem = {
    habitList: {
        id: string,
        habitName: string,
        dateStart: string,
        highStreak: string,
        actId: string
    }[]
}

export type WeightItem = {
    weightList: {
        id: string,
        dateSet: string,
        weight: string
    }[]
}

export type AuthItem = {
    userId: string
}

export type ProfileItem = {
    reminder: string,
    bmi: string,
    height: string
}