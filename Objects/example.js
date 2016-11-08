// Objects and Functions.

// First setup:
var neisy = {
 name: 'Neisy',
 sayName: function() {
 console.log(this);// this is refering to the entire object
  }
}

// Will print out the entire object when run our sayName function.
neisy.sayName();


// Second setup:
var neisy = {
 name: 'Neisy',
 sayName: function() {
 console.log(this.name);// Accesing the entire object
  // and the name of the property
  }
}

neisy.sayName();
Neisy // print out the name property


// This pattern of put in a function on an object is a very
// common pattern called a method.
// A method is a property that's equal to a function.
// So in this example sayName is a method on a neisy object.
// Finally when you have a function on an object,don't need
// to give it a name because the way you're going to call the
// function, is with the property name: neisy.sayName();
// So this example is showing an anonymous function.
