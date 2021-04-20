import * as RNlocalize from 'react-native-localize'
import moment from 'moment-timezone'

export const currDate = () => {
    const timezone = RNlocalize.getTimeZone()
    const today = moment().tz(timezone)
    const offset = today.utcOffset() / 60

    const now = new Date()
    const updatedNow = new Date(now.getTime() + offset)

    console.log('now',now);
    console.log('updatedNow',updatedNow);

    return updatedNow
}