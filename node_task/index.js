const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { db } = require('./db');
const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

const cart = [];

const findIndexInCart = (id) => cart.findIndex((x) => x.id_product === id);

// get all products
app.get('/products', (_, res) => {
  res.send(JSON.stringify(db.products));
});

// get products in cart
app.get('/cart', (_, res) => {
  res.send(JSON.stringify(cart));
});

// add new product to cart
app.put('/cart', (req, res) => {
  const { id } = req.body;
  const item = db.products.find((x) => x.id_product === id);
  if (!item) {
    res.statusCode = 404;
  } else {
    const index = findIndexInCart(id);
    if (index === -1) cart.push({ ...item, count: 1 });
    else cart[index].count++;
  }
  res.send();
});

// delete product from cart
app.delete('/cart', (req, res) => {
  const { id } = req.query;
  const index = findIndexInCart(+id);
  if (index !== -1) {
    if (cart[index].count > 1) cart[index].count--;
    else cart = [...cart.slice(0, index), ...cart.slice(index + 1, cart.length)];
  }
  res.send();
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
