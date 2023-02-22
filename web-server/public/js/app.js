console.log('Client side javascript file is loaded')

//allows the program to do things when the user interacts with the form 
const weatherForm = document.querySelector('form')
//variable for fetching user input
const search = document.querySelector('input')
//variables for fetching ids from app.js
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

//runs every time the form is submitted
weatherForm.addEventListener('submit', (e) => {
    //prevents the browser from refreshing
    e.preventDefault()
    //extracts the input value and stores it
    const location = search.value

    //rendering loading message and empty paragraph
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    //fetch data from the url and then run this function
fetch('http://localhost:3000/weather?address=' + location).then((response) => {
    //gets parsed data
    response.json().then((data) => {
        //if there's an error, show the error
        if (data.error) {
            messageOne.textContent = data.error
        } else {
            //rendering location and forecast data if there are no errors
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
        }
    })
})
})