// Book Constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

// UI Constructor

function UI() {}

// Add Book to List
UI.prototype.addBookToList = function (book) {
  const list = document.getElementById('book-list');
  // Create tr element
  const row = document.createElement('tr');
  // Insert cols
  row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X</a></td>
  `;
  list.appendChild(row);
};

// Clear fields

UI.prototype.clearFields = function () {
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('isbn').value = '';
};

// Show Alerts
UI.prototype.showAlert = function (message, typeAlert) {
  // Create a div
  const div = document.createElement('div');
  // Add classname
  div.className = `alert ${typeAlert}`;
  // Add text
  div.appendChild(document.createTextNode(message));
  // Get parent
  const container = document.querySelector('.container');
  const form = document.querySelector('#book-form');
  // Insert alert
  container.insertBefore(div, form);
  // Timeout after 3sec
  setTimeout(function () {
    document.querySelector('.alert').remove();
  }, 3000);
};

// Delete book
UI.prototype.deleteBook = function (target) {
  if (target.className === 'delete') {
    target.parentElement.parentElement.remove();
  }
};

// Event Listeners for add book

document.getElementById('book-form').addEventListener('submit', function (e) {
  // Get form values

  const title = document.getElementById('title').value,
    author = document.getElementById('author').value,
    isbn = document.getElementById('isbn').value;

  //Instantiate a book
  const book = new Book(title, author, isbn);

  // Instantiate UI
  const ui = new UI();

  // Validate
  if (title === '' || author === '' || isbn === '') {
    // Error alert
    ui.showAlert('Please fill in all fields', 'error');
  } else {
    // Add book to list
    ui.addBookToList(book);

    // Show success
    ui.showAlert('Book Added', 'success');

    // Clear fields
    ui.clearFields();
  }

  e.preventDefault();
});

// Event Listener for delete a book
document.getElementById('book-list').addEventListener('click', function (e) {
  e.preventDefault();
  const ui = new UI();

  // Delete book
  ui.deleteBook(e.target);
  // Show message
  ui.showAlert('Book removed !', 'success');
});
