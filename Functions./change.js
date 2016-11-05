// Fundamental change function

// Set up:
var authors = ['emilio salgari', 'garcia lorca', 'bob dylan', 'borges'];

function changeAuthor(position, newValue) {
  authors[position] = newValue;
}

displayAuthor();

// Console results:
// My authors: ["emilio salgari", "garcia lorca", "bob dylan", "borges"]

// Changing the second item
changeAuthor(1, 'julio verne');

// Call
displayAuthor();

// New Console results:
// My authors: ["emilio salgari", "julio verne", "bob dylan","borges"]


function changeAuthor(position, newValue) {
authors[position] = newValue;
displayAuthor(); // Automatically display changes
}
displayAuthor();

// Console results:
// My authors: ["emilio salgari", "julio verne", "bob dylan", "borges"]

// Changing the four item:
changeAuthor(3, 'garcia marquez');

// New Console results:
// My authors: ["emilio salgari", "julio verne", "bob dylan","garcia marquez"]
