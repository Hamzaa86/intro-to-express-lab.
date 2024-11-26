const collectibles = [
  { name: 'shiny ball', price: 5.95 },
  { name: 'autographed picture of a dog', price: 10 },
  { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
]

const shoes = [
  { name: 'Birkenstocks', price: 50, type: 'sandal' },
  { name: 'Air Jordans', price: 500, type: 'sneaker' },
  { name: 'Air Mahomeses', price: 501, type: 'sneaker' },
  { name: 'Utility Boots', price: 20, type: 'boot' },
  { name: 'Velcro Sandals', price: 15, type: 'sandal' },
  { name: 'Jet Boots', price: 1000, type: 'boot' },
  { name: 'Fifty-Inch Heels', price: 175, type: 'heel' }
]

const express = require('express')
const validator = require('validator')

const app = express()
app.get('/greetings/:name', (req, res) => {
  res.send(`<h1>Hello, ${req.params.name}</h1>`)
})

app.get('/roll/:number', (req, res) => {
  const number = parseInt(req.params.number, 10) // we convert the string to an integer
  if (isNaN(number) || number <= 0) {
    return res.send('Enter a valid number')
  }
  const random = Math.floor(Math.random() * number) + 1
  res.send(`You rolled: ${random}`)
})

app.get('/collectibles/:index', (req, res) => {
  const index = parseInt(req.params.index, 10) // Ensure index is treated as an integer
  const length = collectibles.length

  // Check if index is valid and within the range
  if (index >= 0 && index < length) {
    res.send(
      `You want the ${collectibles[index].name}? For ${collectibles[index].price}. It can be yours!`
    )
  } else {
    res.status(404).send('Collectible not found.')
  }
})

app.get('/shoes', (req, res) => {
  const selectedShoes = []

  // If there are query parameters
  if (Object.keys(req.query).length !== 0) {
    const minPrice = req.query['min-price']
      ? parseFloat(req.query['min-price'])
      : -Infinity
    const maxPrice = req.query['max-price']
      ? parseFloat(req.query['max-price'])
      : Infinity
    const type = req.query.type

    shoes.forEach((element) => {
      if (
        minPrice <= element.price &&
        maxPrice >= element.price &&
        (type ? type === element.type : true)
      ) {
        selectedShoes.push(element)
      }
    })

    res.send(
      selectedShoes.length > 0 ? selectedShoes : 'No shoes match the criteria'
    )
  }
  // If no query parameters, return all shoes
  else {
    res.send(shoes)
  }
})

app.listen(3000, () => {
  console.log('Server is running on port 3000')
})
