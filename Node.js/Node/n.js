// $ npm view lodash version

// $ npm show lodash version


//
var sum = 1;
console.log(`sum = ${sum}`);


//
var columnNames = [' name', 'ring ', '   quadrant', 'isNew   ', '   description   ', 'owner     ']; // 
columnNames = ['name', 'ring', 'quadrant', 'isNew', 'description', 'owner'];

columnNames.forEach(element => { 
  if(element.indexOf(' ') >= 0) {
    // throw new Error("Error: Whitespace in element.");
    callback(new Error("Error: Whitespace in element."));
  } 
});


//
const _ = {
  each: require('lodash/each'),
  // map: require("lodash/map"),
  // uniqBy: require("lodash/uniqBy"),
  sortBy: require("lodash/sortBy"),
}

columnNames = ['ring', 'quadrant', 'isNew', 'description']; //
columnNames = ['name', 'ring', 'quadrant', 'isNew', 'description', 'owner'];

_.each(['name', 'ring', 'quadrant', 'isNew', 'description', 'owner'], function (field) {
  if (columnNames.indexOf(field) == -1) {
    // throw new Error("Error: Missing element.");
    callback(new Error("Error: Missing element."));
  }
});

var users = [
  { 'user': 'fred',   'age': 48 },
  { 'user': 'barney', 'age': 36 },
  { 'user': 'fred',   'age': 40 },
  { 'user': 'barney', 'age': 34 }
];

console.log(_.sortBy(users, [function(o) { return o.user; }]));
// => objects for [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 40]]
 
console.log(_.sortBy(users, [function(o) { return [o.user, o.age]; }]));
// => objects for [['barney', 34], ['barney', 36], ['fred', 40], ['fred', 48]]

console.log(_.sortBy(users, ['user', 'age']));
// => objects for [['barney', 34], ['barney', 36], ['fred', 40], ['fred', 48]]