const request = require('request')

const geoCode = (address , callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoibmV3dG9uaWFuNDUiLCJhIjoiY2p0dHBjM3VwMHlnaTQ2bnB5ZmJldDljbyJ9.euc7sJbuLDB-Qu1DvfrvOw&limit=2&`
    request({uri: url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to location service.')
        } else if (body.features.length === 0) {
            callback('Unable to find given location. Try another search.')
        } else {
            const longitude = body.features[0].center[0]
            const latitude = body.features[0].center[1]
            callback(undefined, { longitude, latitude })
        }
    })

}

const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/75edf0126909f01278d0f6df18dd412b/${latitude},${longitude}?units=si`

    request({uri: url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service.')
        } else if (body.error) {
            callback(body.error)
        } else {
            console.log(body.currently)
            const weather = `${body.currently.summary} with a ${body.currently.precipProbability * 100}% chance of rain at ${body.currently.temperature}C`
            callback(undefined, {weather})
        }
    })
}

module.exports = {
    geoCode,
    forecast
}