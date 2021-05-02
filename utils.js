// import * as RNlocalize from 'react-native-localize'
// import moment from 'moment-timezone'

export const dateConvert = (dateIn) => {
    // const timezone = RNlocalize.getTimeZone()
    // const today = moment().tz(timezone)
    // const offset = today.utcOffset() / 60

    // const updatedDate = new Date(dateIn.getTime() + offset)
    // console.log('updatedDate',updatedDate);

    return {day: dateIn.getDate(), month: dateIn.getMonth() + 1, year: dateIn.getFullYear()}
}