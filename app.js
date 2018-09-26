// Book Constructor

function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

// UI Constructor
function UI() {}

//

UI.prototype.addBookToList = function(book) {
  //Add Book to list
  const list = document.getElementById('book-list');
  const row = document.createElement('tr');
  //insert colls
  row.innerHTML = `
  <td>${book.title}</td>
  <td>${book.author}</td>
  <td>${book.isbn}</td>
  <td><a href="#" class="delete">X</a></td>`;
  list.appendChild(row);
}



// UI show alert
UI.prototype.showAlert = function(message, className) {
  //Create div
  const div = document.createElement('div');
  //addClasses
  div.className = `alert ${className}`;
  div.appendChild(document.createTextNode(message));
  const container = document.querySelector('.container');
  const form = document.querySelector('#book-form');
  container.insertBefore(div, form);

  //Timeout 3 seconds

  setTimeout(function(){
    document.querySelector('.alert').remove()
  }, 3000);

}

//delete Book

UI.prototype.deleteBook = function(target) {
  if(target.className === 'delete'){
    target.parentElement.parentElement.remove();
  }
}
// Clear fields
UI.prototype.clearFields = function() {
  document.getElementById('title').value = ''
  document.getElementById('author').value = ''
  document.getElementById('isbn').value = '';
}
//Event listner
document.getElementById('book-form').addEventListener('submit', function(e) {
  // Get form values
  const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value

  //Instance of a book
  const book = new Book(title, author, isbn);

  //Instance of UI
  const ui = new UI();
  //Add book to listner

  // Validation
  if(title === '' || author === '' || isbn === '') {
    // Error alert
    ui.showAlert('Please fill in all fields', 'error');
  } else {
    ui.addBookToList(book);

    // Show success
    ui.showAlert('Book Added!', 'success');

    //Clear fields
    ui.clearFields();
  }


  e.preventDefault();
});

//event listener for delete
document.getElementById('book-list').addEventListener('click', function(e) {

  const ui = new UI();
  ui.deleteBook(e.target);
  ui.showAlert('Book Removed!', 'success');
  e.preventDefault();
});
