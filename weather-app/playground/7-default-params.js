//user defaults as name arguement when no name is provided
const greeter = (name = 'user', age) => {
    console.log('Hello ' + name )
}

//calling the function with arguement
greeter('Deborah')
//calling the function without arguement
greeter()