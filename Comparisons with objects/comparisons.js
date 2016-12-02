// Comparisons with objects

var authorB = {};
authorB === authorB

var authorC = [];
authorC === authorC

// Console results:
// true

// In JavaScript when you create an object it actually saves that object at a unique location in memory.
// Objects are different than primitives(values) in JavaScript,
// they are references which means memory address.So when you save an object to a variable,
// JavaScript is not saving the stuff inside of this {},is not looking at the values,is actually saving the memory address.
// Is saving a reference,so it can be refer to the value.
