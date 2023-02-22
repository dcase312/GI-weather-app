//calling geocode function from geocode.js
const geocode = require('./utils/geocode')

//calling function from forecast.js
const forecast = require('./utils/forecast')

const address = process.argv[2]

if (!address){
    console.log('Please provide an address')
} else {
//callback chaining where you chain together multiple callbacks to do many things in a specific order
//desctructured the object in our API so we can call each property by name
geocode(address, (error, { latitude, longitude, location } = {}) => {
    //if there's an error the function will return the error and stop, otherwise it'll skip to the next step
    if (error){
        return console.log(error)
    } 
    forecast(latitude, longitude, (error, forecastData) => {
        //if there's an error the function will return the error and stop, otherwise it'll skip to the next step
        if (error){
            return console.log(error)
        }
        //shows the location first
        console.log(location)
        //then the forecast
        console.log(forecastData)
      })
})
}

console.log(process.argv)




  


























/*console.log('Starting')
//asynchronous function that runs code after a specific amount of time has passed
//takes 2 parameters both are required, a function and number of miliseconds to wait til callback gets executed
setTimeout(() => {
    console.log('2 second timer')
}, 2000)

setTimeout(() => {
    console.log('0 second timer')
}, 0)

console.log('Stopping')*/