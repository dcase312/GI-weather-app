const path = require('path')

//express library is a function and we're lading it in here
const express = require('express')
const app = express()
const hbs = require('hbs')
//loading in functions
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')



//provides path to directory
//links our html file
//defines paths for express configuration
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


//setup handlebars engine and views location
//method that allows you to set a value for a given express setting
//key, setting name, value
app.set('view engine', 'hbs')

//telling express to use this path
app.set('views', viewsPath)

//path for partials
hbs.registerPartials(partialsPath)

//setup static directory to serve
//static route aka route never changes
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    //renders handlebar template
    //passes values to render
    //takes 2 arguements; name of new template and object being passed
    res.render('index', {
        title: 'Weather',
        name: "Deborah Case"
    })
})

//creating route for about page
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Deborah Case'
    } )
})

//creating route for help page
app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is helpful text',
        title: 'Help',
        name: 'Deborah Case'
    })
})

//tells the server what to do when a user asks for a resource at a specific url
//takes 2 arguements, the route and a function
//function takes 2 arguements, request and response
//JSON can be passed through as an object. Arrays can also be passed through
app.get('/weather', (req, res) =>{
    //if there's no address run this code
    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    //default object set for if property isn't provided so the app doesn't crash and shows the error message
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) =>{
        //this code runs if there is an error
        if (error) {
            return res.send({ error })
        }

        //this code runs if there's no errors
        forecast(latitude, longitude, (error, forecastData) => {
            if (error){
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })

    //if there is run this one
    //allows us to send something to the user
    //html can be passed through the string
    // res.send({
    //     forecast: 'It is snowing',
    //     location: 'Charlotte',
    //     address: req.query.address
    // })
})

//creating an endpoint that sends back products to be displayed in browser
app.get('/products', (req, res) =>{
    if (!req.query.search) {
        //can only send 1 request to the server so return stops the function 
        return res.send({
            error: 'You must provide a search term'
        })
    }

    //info about query string lives on request, that's how our server recieves information to execute
    console.log(req.query.serch)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Deborah Case',
        errorMessage: 'Help article not found'
    })
})

//wildcard handler creating route for anything that doesn't match a preset url
//404 page purposes
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Deborah Case',
        errorMessage: 'Uh oh! Page not found try again'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})