// Fundamental delete function

// Set up:

var authors = ['emilio salgari', 'julio verne', 'bob dylan','garcia marquez']

function deleteAuthor(position) {
authors.splice(position, 1);
displayAuthor();
}

displayAuthor();

// Console results:
// My authors: ["emilio salgari", "julio verne", "bob dylan","garcia marquez"]

// Deleting first item:
deleteAuthor(0);

// New Console results:
// My authors: ["julio verne", "bob dylan","garcia marquez"]

// Deleting third item:
deleteAuthor(2);

// New Console results:
// My authors: ["julio verne", "bob dylan"]
