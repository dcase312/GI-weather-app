const request = require('request')

//geocode API request grabs the latitude and longitude of locations so we can type in a location and it'll change it to lat&long so our weather API can grab data for any location
//communicating with mapbox api
const geocode = (address, callback) => {
    //inputs location into address to get mapbox api info
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZGNhc2U5OSIsImEiOiJjbGUxMTljNWQwZmRpM3dvNmF0OGlzbHNwIn0.i1TCEsFnKE57r64ehA6esw&limit=1'
    //handles error if something went wrong with the request
    request({url, json: true}, (error, { body }) => {
        //error for if you have connection issues
        if (error){
            callback('Unable to connect to location services', undefined)
            //error for if you don't put in a valid location
        } else if (body.features.length === 0){
            callback('Unable to find location. Try another search.', undefined)
            //if there are no errors, display the lat, long, and location
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

//allows function to be exported to other files 
module.exports = geocode