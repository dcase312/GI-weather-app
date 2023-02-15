const request = require('request')


const forecast = (latitude, longitude, callback) => {
    //grabbing the weatherstack API via access key to grab weather data for san francisco in farenheit units
    //inserts latitude and longitude into url to get weather info of that specific location
    const url = 'http://api.weatherstack.com/current?access_key=d10ec9850b6c53fd8546e43dda20a6ed&query=' + latitude + ',' + longitude + '&units=f'
    
    //function takes 2 arguements, 1st is an object that provides url, 2nd is a function to run once we get a response
    //anonymous function takes two arguements: error in case something goes wrong, and response elsewise 
    //json:true is a property that atutomatically parses JSON 
    //descructured the object 
    request({url, json: true}, (error, { body }) => {
        //creating a condition for what we want to display when there's an error and when there isn't
        if (error){
            callback('Unable to connect to weather service', undefined)
        } else if (body.error){
            callback('Unable to find location', undefined)
        } else {
             //.current property contains current forecast information
            callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees out. It feels like ' + body.current.feelslike + ' degrees out')
        }
    })
}
//exporting function
module.exports = forecast