class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {
  addBookToList(book) {
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

  showAlert(message, className) {
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

  deleteBook(target) {

    if(target.className === 'delete'){
      target.parentElement.parentElement.remove();
      const ui = new UI();
      ui.showAlert('Book Removed!', 'success');
    }
  }

  clearFields() {
    document.getElementById('title').value = ''
    document.getElementById('author').value = ''
    document.getElementById('isbn').value = '';
  }
}


//Local Storage class
class Store {
  static getBooks(){
    let books;
    if(localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }

    return books;
  }
  static displayBooks() {
    const books = Store.getBooks();
    books.forEach(function(book){
      const ui = new UI();

      //Add book to ui
     ui.addBookToList(book);
   });
  }

  static addBook(book){
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(isbn){
    const books = Store.getBooks();
    books.forEach(function(book, index){
      if(book.isbn === isbn) {
        books.splice(index, 1);
      }
      localStorage.setItem('books', JSON.stringify(books));
    });

    localStorage.setItem('books', JSON.stringify(books));
  }

}

// DOM load Event
document.addEventListener('DOMContentLoaded', Store.displayBooks);
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

    //addBook to localstorage
    Store.addBook(book);

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
  if (e.target.parentElement.previousElementSibling !== null) {
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
  }
  e.preventDefault();
});
