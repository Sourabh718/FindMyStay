use('mongodbVSCodePlaygroundDB');

// Insert a few documents into the sales collection.
db.getCollection('cources').insertMany([
  { 'item': 'abc', 'price': 10, 'quantity': 2},
  { 'item': 'jkl', 'price': 20, 'quantity': 1},
  { 'item': 'xyz', 'price': 5, 'quantity': 10},
  { 'item': 'xyz', 'price': 5, 'quantity': 20},
  { 'item': 'abc', 'price': 10, 'quantity': 10},
  { 'item': 'def', 'price': 7.5, 'quantity': 5},
  { 'item': 'def', 'price': 7.5, 'quantity': 10},
  { 'item': 'not defined', 'price': 'not defined', 'quantity': 'not defined'},
]);


// Print a message to the output window.
console.log(`done inserting data`);
