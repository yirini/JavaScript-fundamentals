// Booleans

var authorList = {
  authors: [],
  displayAuthors: function() {
   console.log('My authors', this.authors);
  },
 addAuthor: function(authorText) { 	// Some text value.
  //Adding and object with 2 properties.
  this.authors.push({
  	authorText:authorText, // Second authorText is refering to the (authorText) as a parameter.
  	completed:false
  });
  this.displayAuthors();
},
 changeAuthor:function(position, authorText) {
  //authorText property set it to the new value authourText has passed it when you run the function.
  this.authors[position].authorText = authorText;
  this.displayAuthors();
},
deleteAuthor:function(position) {
 	this.authors.splice(position, 2);
 	this.displayAuthors();
 },
 toggleCompleted: function(position) {
 	// Saving a reference to the specific author.
 	var author = this.authors[position];
 	// Grabing author.completed(boolean true or false value) and putting on the
 	// right with the bang operator which give you the opposite of the  boolean value.
 	author.completed = !author.completed;
 	this.displayAuthors();
 }
};

// authorList.addAuthor('boolean testing');
// Console results:
// My authors Array[1]0:
// ObjectauthorText: "boolean testing"
// completed: false

// authorList.toggleCompleted(0);
// Console results:
// My authors Array[1]0:
// ObjectauthorText: "boolean testing"
// completed: true
