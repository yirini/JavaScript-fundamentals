var authorList = {
  authors:[],
  addAuthor: function(authorText) {
  this.authors.push({
  	authorText:authorText,
  	completed:false
  });
 },
changeAuthor:function(position, authorText) {
  this.authors[position].authorText = authorText;
},
deleteAuthor:function(position) {
  this.authors.splice(position, 2);
},
toggleCompleted: function(position) {
var author = this.authors[position];
author.completed = !author.completed;
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
  // Case 2: Otherwise,make everything true.
  } else {
  for(var i = 0; i < totalAuthors; i++) {
   this.authors[i].completed = true;
    }
   }
  }
 };

 var handlers = {
  addAuthor: function() {
  var addAuthorTextInput = document.getElementById('addAuthorTextInput');
   authorList.addAuthor(addAuthorTextInput.value);
   addAuthorTextInput.value = '';
   view.displayAuthors();
 },
  changeAuthor: function() {
   var changeAuthorPositionInput = document.getElementById('changeAuthorPositionInput');
   var changeAuthorTextInput = document.getElementById('changeAuthorTextInput');
   authorList.changeAuthor(changeAuthorPositionInput.valueAsNumber, changeAuthorTextInput.value);
   changeAuthorPositionTextInput.value ='';
   changeAuthorTextInput.value ='';
   view.displayAuthors();
 },
  deleteAuthor: function(position) {
   authorList.deleteAuthor(position);
   view.displayAuthors();
 },
 toggleCompleted: function() {
   var toggleCompletedPositionInput = document.getElementById('toggleCompletedPositionInput');
   authorList.toggleCompleted(toggleCompletedPositionInput.valueAsNumber);
   toggleCompletedPositionInput.value= '';
   view.displayAuthors();
 },
 toggleAll:function() {
  authorList.toggleAll();
  view.displayAuthors();
 }
};

 var view = {
   displayAuthors: function() {
   var authorsUl = document.querySelector('ul');
   authorsUl.innerHTML = '';
   for (var i = 0; i < authorList.authors.length; i++) {
   var authorLi = document.createElement('li');
   var author = authorList.authors[i];
   var authorTextWithCompletion = '';

   if (author.completed === true) {
    authorTextWithCompletion = '(x) ' + author.authorText;
    } else {
    authorTextWithCompletion = '( ) ' + author.authorText;
    }

    authorLi.id = i;
    authorLi.textContent = authorTextWithCompletion;
    authorLi.appendChild(this.createDeleteButton());
    authorsUl.appendChild(authorLi);
    }
   },
    createDeleteButton: function() {
     var deleteButton = document.createElement('button');
     deleteButton.textContent = 'Delete';
     deleteButton.className = 'deleteButton';
     return deleteButton;
   },
   setUpEventListeners: function() {
    var authorsUl = document.querySelector('ul');

   authorsUl.addEventListener('click', function(event) {
   // Get the element that was clicked on.
   var elementClicked = event.target;

  // Check if elementClicked is a delete button.
  if(elementClicked.className === 'deleteButton') {
  // Run handlers.deleteAuthor(position).
   handlers.deleteAuthor(parseInt(elementClicked.parentNode.id));
    }
   });
  }
 };

 view.setUpEventListeners();
