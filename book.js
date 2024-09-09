("use strict");

const dialog = document.querySelector("dialog");
const showButton = document.querySelector("dialog + button");
const closeButton = document.querySelector(".options > .delete");

// "Show the dialog" button opens the dialog modally
showButton.addEventListener("click", () => {
    dialog.showModal();
});

// "Close" button closes the dialog
closeButton.addEventListener("click", () => {
    dialog.close();
});

const namePattern = /^[a-zA-Z0-9\s,.'-]{1,100}$/;
const numberPattern = /^[1-9][0-9]{0,4}$/;
const myLibrary = [];



function setErrorMessage(elementId, message) {
    const element = document.getElementById(elementId);
    element.textContent = message;
}


function verifyBookTitle() {
    const bookName = document.querySelector("#book_name").value;
    if (namePattern.test(bookName)) {
        setErrorMessage("title_error", "");// Clear any previous error
        return true;
    } else {
        setErrorMessage("title_error", "Please fill the book name correctly."); // Show error message
        return false;
    }
}

function verifyAuthorName() {
    const author = document.querySelector("#author").value;
    if (namePattern.test(author)) {
        setErrorMessage("authorError", ""); // Clear any previous error
        return true;
    } else {
        setErrorMessage("authorError", "Please fill the author name correctly.");// Show error message
        return false;
    }
}


function verifyPagesNumber() {
    const nbPages = document.querySelector("#nb_pages").value;
    if (numberPattern.test(nbPages)) {
        setErrorMessage("pagesError", ""); // Clear any previous error
        return true;
    } else {
        setErrorMessage("pagesError", "Please enter a valid number of pages."); // Show error message
        return false;
    }
}

function validateBookInputs() {
    return verifyBookTitle() && verifyAuthorName() && verifyPagesNumber();
}


function addBook() {
    event.preventDefault();
    if (validateBookInputs()) {
        const bookName = document.querySelector("#book_name").value;
        const author = document.querySelector("#author").value;
        const nbPages = document.querySelector("#nb_pages").value;

        const isRead = document.querySelector("#status").checked;
        const newBook = new Book(bookName, author, nbPages, isRead);
        newBook.addBookToLibrary();
        dialog.close();
        addBookToDisplay(newBook,myLibrary.length-1);
    }
}


class Book {
    constructor(title, author, pages, isRead) {
        this.bookName = title;
        this.author = author;
        this.nbPages = pages;
        this.isRead = isRead
    }
}

Book.prototype.addBookToLibrary = function () {
    myLibrary.push(this);
    
}




function addBookToDisplay(book, index) {
    const libraryDisplay = document.getElementById("display");

    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card", "monster");

    const bookNameElement = document.createElement("h3");
    bookNameElement.classList.add("bookName");
    bookNameElement.textContent = book.bookName;

    const infoDiv = document.createElement("div");
    infoDiv.classList.add("info");

    const authorElement = document.createElement("h4");
    authorElement.classList.add("writer", "fifty");
    authorElement.textContent = `by ${book.author}`;

    const pagesElement = document.createElement("p");
    pagesElement.classList.add("pages_number", "fifty");
    pagesElement.textContent = `${book.nbPages}`;

    infoDiv.appendChild(authorElement);
    infoDiv.appendChild(pagesElement);

    const buttonsDiv = document.createElement("div");
    buttonsDiv.classList.add("buttons");

    // Create the "read" button
    const readButton = document.createElement("button");
    readButton.classList.add("state", "option");
    readButton.textContent = book.isRead ? "Read" : "Not Read";
    readButton.onclick = () => readBook(index);

    // Create the "delete" button
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete", "option");
    deleteButton.textContent = "Delete";
    deleteButton.onclick = () => deleteBook(index);

    // Append buttons to buttonsDiv
    buttonsDiv.appendChild(readButton);
    buttonsDiv.appendChild(deleteButton);

    // Create the status paragraph
    const statusElement = document.createElement("p");
    statusElement.classList.add("status");
    statusElement.textContent = book.isRead ? "Completed" : "Not Completed";

    // Append all elements to the cardDiv
    cardDiv.appendChild(bookNameElement);
    cardDiv.appendChild(infoDiv);
    cardDiv.appendChild(document.createElement("hr")); // Add the horizontal rule
    cardDiv.appendChild(buttonsDiv);
    cardDiv.appendChild(document.createElement("hr")); // Add another horizontal rule
    cardDiv.appendChild(statusElement);

    // Append the cardDiv to the main library display container
    libraryDisplay.appendChild(cardDiv);
}


function readBook(index) {
    myLibrary[index].isRead = !myLibrary[index].isRead;

    const libraryDisplay = document.getElementById("display");
    const bookCard = libraryDisplay.children[index];

    // Update the text of the read button and the status paragraph
    const readButton = bookCard.querySelector('.state.option');
    const statusElement = bookCard.querySelector('.status');

    // Update the button text and status text based on the new read status
    readButton.textContent = myLibrary[index].isRead ? "Read" : "Not Read";
    statusElement.textContent = myLibrary[index].isRead ? "Completed" : "Not Completed";
}

function deleteBook(index) {
    myLibrary.splice(index, 1);

    const libraryDisplay = document.getElementById("display");
    const bookCard = libraryDisplay.children[index];
    libraryDisplay.removeChild(bookCard);

    // After deleting, update the UI elements for the remaining books to maintain correct indexes
    updateBookIndexes();
}

function updateBookIndexes() {
    const libraryDisplay = document.getElementById("display");

    // Update onclick handlers for "read" and "delete" buttons to reflect new indexes
    Array.from(libraryDisplay.children).forEach((card, newIndex) => {
        const readButton = card.querySelector('.state.option');
        const deleteButton = card.querySelector('.delete.option');

        readButton.onclick = () => readBook(newIndex);
        deleteButton.onclick = () => deleteBook(newIndex);
    });
}