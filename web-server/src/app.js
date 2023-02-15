const path = require('path')

//express library is a function and we're lading it in here
const express = require('express')
const app = express()

//provides path to directory
//links our html file
const publicDirectoryPath = path.join(__dirname, '../public')

//static route aka route never changes
app.use(express.static(publicDirectoryPath))


//tells the server what to do when a user asks for a resource at a specific url
//takes 2 arguements, the route and a function
//function takes 2 arguements, request and response
//JSON can be passed through as an object. Arrays can also be passed through
app.get('/weather', (req, res) =>{
    //allows us to send something to the user
    //html can be passed through the string
    res.send({
        forecast: 'It is snowing',
        location: 'Charlotte'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})