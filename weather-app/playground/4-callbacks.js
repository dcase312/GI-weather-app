//function that runs 2 seconds behind
setTimeout(() => {
    console.log('Two seconds are up')
}, 2000)

const names = ['Andrew', 'Dee', 'Harlow', 'Hayden']
//a function that filters names that are less than or equal to 6 from the array and returns them
const shortNames = names.filter((names) =>{
    return names.length <=6
})

//creating callback function
const geocode = (address, callback) => {
    setTimeout(() => {
        const data = {
            latitude: 0,
            longitude: 0
        }
    //function is asynchronous so using callback instead of return
        callback(data)
    }, 2000)
}
geocode('Philadelphia', (data) => {
    console.log(data)
})

const add = (a, b, callback) => {
    //function within a function aka callback function
    setTimeout(() => {
        //callback is used here instead of return
        callback(a+b)
    }, 2000)
}

//calling the add function which adds two numbers and displays results with 2 sec delay
add(1, 4, (sum) => {
    console.log(sum) // Should print: 5
})

