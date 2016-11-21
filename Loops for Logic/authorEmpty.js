// displayAuthors should tell you if.author is empty

var authorList = {
  authors: [],
  displayAuthors: function() {
   if(this.authors.length === 0) {
      console.log('Your author list is empty!');
    } else {
      console.log('My authors:');
   for(var i = 0; i < this.authors.length; i++) {
    console.log(this.authors[i].authorText);
     }
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

authorList.displayAuthors();
// Console results:
// Your author list is empty!

authorList.addAuthor('Jules Verne');
// Console results:
// My authors:
// Jules Verne

authorList.deleteAuthor(0);
//Console results:
// Your author list is empty!
