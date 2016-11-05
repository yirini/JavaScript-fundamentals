// Recap:

var authors = ['emilio salgari', 'garcia lorca', 'bob dylan'];

// Function to display authors:
function displayAuthor() {
console.log("My authors:", authors);
}

// Function to add authors:
function addAuthor(author) {
authors.push(author);
displayAuthor();
}

// Function to change authors:
function changeAuthor(position, newValue) {
authors[position] = newValue;
displayAuthor();
}

// Function to delete authors:
function deleteAuthor(position) {
  authors.splice(position, 1);
  displayAuthor();
}
