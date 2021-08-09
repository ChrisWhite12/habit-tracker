export type DispatchType = | {
    type: 'CREATE_HABIT',
    id: string,
    habitData: {
        habitName: string,
        dateStart: string, 
        highStreak: string
    }
} |
{
    type: 'FETCH_HABIT',
    habits: {
        dateStart: string,
        habitName: string,
        highStreak: string,
        id: string
    }[]
} |
{
    type: 'UPDATE_HABIT',
    id: string,
    habitData: {
        highStreak: string
        dateStart: string
    },
    actId: string
} |
{
    type: 'DELETE_HABIT',
    id: string
} | 
{
    type: 'CREATE_ACTIVITY',
    id: string,
    habitId: string,
    date: string
} | 
{
    type: "UPDATE_ACTIVITY_CREATE",
    habitId: string,
    date: string
} |
{
    type: "UPDATE_ACTIVITY_DELETE",
    habitDelId: string,
    date: string,
    actId: string
}