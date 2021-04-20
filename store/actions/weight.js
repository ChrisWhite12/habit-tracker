export const CREATE_WEIGHT = 'CREATE_WEIGHT'
export const FETCH_WEIGHT = 'FETCH_WEIGHT'

export const createWeight = (weight, date) => {
    return async (dispatch) => {
        const response = await fetch(`https://habit-tracker-b02ec-default-rtdb.firebaseio.com/weight.json`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({weight: weight, date: date})
        })
        const resData = await response.json()

        if(!response.ok){
            throw new Error('Response not OK')
        }

        console.log(resData)

        dispatch({
            type: CREATE_WEIGHT,
            weightData: {
                id: resData.name,
                weight,
                date
            }
        })
    }
}

export const fetchWeight = () => {
    return async (dispatch) => {
        const response = await fetch(`https://habit-tracker-b02ec-default-rtdb.firebaseio.com/weight.json`)
        const resData = await response.json()
        let resOut = []
    
        const currMonth = new Date().getMonth() + 1

        for (const key in resData) {
            resOut.push({weight: resData[key].weight, date: resData[key].date})
        }

        // console.log('currMonth', currMonth)
        // console.log('resOut',resOut);

        const filtRes = resOut.filter(el => {
            const stringParts = el.date.split('/')
            console.log('stringParts',stringParts);
            if(stringParts[1] === currMonth.toString()){
                return el
            }

        })
        console.log('filRes', filtRes)
    }
}