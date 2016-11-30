//.toggleAll: If everything's true, make everything false.

var authorList = {
  authors:[],
  displayAuthors:function() {
    if(this.authors.length === 0) {
      console.log('Your author list is empty!');
    } else {
    console.log('My authors:');
    for(var i = 0; i < this.authors.length; i++) {
     if(this.authors[i].completed === true) {
       console.log('(x)', this.authors[i].authorText);
     } else {
       console.log('()', this.authors[i].authorText);
     }
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
},

toggleAll: function() {
  var totalAuthors = this.authors.length;
  var completedAuthors = 0;

  // Get number of completed authors.
  for (var i = 0; i < totalAuthors; i++) {
    if(this.authors[i].completed === true) {
      completedAuthors++;
    }
  }
// Case 1: If everything's true,make everything false.
if(completedAuthors === totalAuthors) {
  for(var i = 0; i < totalAuthors; i++) {
    this.authors[i].completed = false;
  }
 }
 this.displayAuthors();
}
};

authorList.addAuthor('first');
// Console results:
// My authors:
// () first

authorList.addAuthor('second');
// Console results:
// My authors:
// () first
// () second

authorList.toggleCompleted(1);
// Console results:
// My authors:
// () first
// (x) second

authorList.toggleCompleted(0);
// Console results:
// My authors:
// (x) first
// (x) second

authorList.toggleAll();
// Console results:
// My authors:
// () first
// () second
