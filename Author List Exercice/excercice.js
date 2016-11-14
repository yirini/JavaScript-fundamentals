// Storing the authors array on an object:
var authorList = {
  authors: ['emilio salgari', 'garcia lorca', 'bob dylan'],
  displayAuthors: function() { // displayAuthors method
   console.log('My authors', this.authors);// Accesing the entire object
    // and the name of the property
  },
// authorList.displayAuthors();
// Console Print out:
// My authors ["emilio salgari", "garcia lorca", "bob dylan"]

 addAuthor: function(author){  // addAuthors method
  this.authors.push(author);  // Refers to the array up.
  this.displayAuthors();
},
// authorList.addAuthor('Marti');
// Console Print out:
// My authors ["emilio salgari", "garcia lorca", "bob dylan", "Marti"]

 changeAuthor:function(position, newValue) {
  this.authors[position] = newValue;
  this.displayAuthors();
 },
 //authorList.changeAuthor(1, 'Wolf');
 // Console Print out:
 // My authors ["emilio salgari", "Wolf", "bob dylan"]

 deleteAuthor:function(position) {
 	this.authors.splice(position, 2);
 	this.displayAuthors();
 }
// authorList.displayAuthors();
// My authors ["emilio salgari", "garcia lorca", "bob dylan"]
// authorList.deleteAuthor(2);
// Console Print out:
// My authors ["emilio salgari", "garcia lorca"]
};
