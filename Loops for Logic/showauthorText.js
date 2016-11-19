// displayAuthors should show .authorText

var authorList = {
  authors: [],
  displayAuthors: function() {
   console.log('My authors:');
   for(var i = 0; i < this.authors.length; i++) {
    console.log(this.authors[i].authorText);// this will be Equal to the authorText property.
    }
  },

 addAuthor: function(authorText) {
  this.authors.push({
  	authorText:authorText,
  	completed:false
  });
  this.displayAuthors();
},

 changeAuthor:function(position, authorText) {
  this.authors[position].authorText = authorText;
  this.displayAuthors();
},

deleteAuthor:function(position) {
 	this.authors.splice(position, 2);
 	this.displayAuthors();
 },

 toggleCompleted: function(position) {
 	var author = this.authors[position];
  author.completed = !author.completed;
 	this.displayAuthors();
 }
};

authorList.addAuthor('first');
// Console results:
// My authors:
// first
// undefined

authorList.addAuthor('second');
// Console results:
// My authors:
// first
// second
// undefined
