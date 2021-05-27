
export const dateConvert = (dateIn) => {

    return {day: dateIn.getDate(), month: dateIn.getMonth() + 1, year: dateIn.getFullYear()}
}