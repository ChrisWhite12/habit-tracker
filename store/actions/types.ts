export type DispatchType = | {
    type: 'CREATE_HABIT'
    id: string,
    habitData: {
        habitName: string
        dateStart: string
        highStreak: string
    }
} |
{
    type: 'FETCH_HABIT'
    habits: {
        dateStart: string
        habitName: string
        highStreak: string
        id: string
    }[]
} |
{
    type: 'UPDATE_HABIT'
    id: string
    habitData: {
        highStreak: string
        dateStart: string
    }
    actId: string
} |
{
    type: 'DELETE_HABIT'
    id: string
} | 
{
    type: 'CREATE_ACTIVITY'
    id: string
    habitId?: string
    exerId?: string
    date: string
} | 
{
    type: "UPDATE_ACTIVITY_CREATE"
    habitId?: string
    exerId?: string
    date: string
} |
{
    type: "UPDATE_ACTIVITY_DELETE"
    habitDelId?: string
    exerDelId?: string
    date: string
    actId: string
} | 
{
    type: 'FETCH_ACTIVITY'
    activities: {
        id: string
        date: string
        exerIds: string[]
        habitIds: string[]
    }[]
} | 
{
    type: 'DELETE_OLD_ACTIVITY'
} |
{
    type: 'SET_ID'
    userId: string
} |
{
    type: 'CREATE_EXERCISE'
    id: string
    exerciseData: {
        id: string
        exerciseName: string
        cal: number
        date: string
        actId: string
    }
} |
{
    type: "FETCH_EXERCISE"
    exerciseFetchData: {
        id: string
        cal: string
        date: string
        exerciseName: string
    }[]
} |
{
    type: "DELETE_EXERCISE"
    id: string
} |
{
    type: "CREATE_PROFILE"
    reminder: string
} |
{
    type: "FETCH_PROFILE"
    reminder: string
} |
{
    type: "UPDATE_PROFILE"
    reminder: string
} |
{
    type: "CREATE_WEIGHT"
    id: string
    weightData: {
        weight: string
        date: string
    }
} |
{
    type: "FETCH_WEIGHT"
    weights: {
        id: string
        weight: string
        dateSet:  string
    }[]
} |
{
    type: "UPDATE_WEIGHT"
    id: string
    weightData: {
        weight: string
        date: string
    }
} |
{
    type: "DELETE_OLD_WEIGHT"
}