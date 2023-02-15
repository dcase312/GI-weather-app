//object property shorthand allows us to add values onto an object with a shorthand syntax under certain conditions

const name = 'Andre'
const userAge = 27

const user = {
    name,
    age: userAge,
    location: 'Jersey'
}

console.log(user)

//Object destructuring is useful for objects you want to access properties from

const product = {
    label: 'Red notebook',
    price: 3,
    stock: 201,
    salesPrice: undefined,
    rating: 4.2
}

// const label = product.label
// const stock = product.stock
//extracting properties from an object creating individual variables that store those values
//can reassign names with a colon between old name and new name
//can add properties by naming them and setting them equal to a value, can be overrided
// const {label:productLabel, stock, rating = 5} = product
// console.log(productLabel)
// console.log(stock)
// console.log(rating)

//default object so when an object is destructured the code still works if an object isn't passed in
//default value set for if value isn't plugged in 
const transaction = (type, { label, stock = 0 } = {}) => {
   console.log(type, label, stock)
}

transaction('order', product)