

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

const titlePattern = /^[a-zA-Z0-9\s,.'-]{1,100}$/;
const authorPattern = /^[a-zA-Z\s.'-]{1,50}$/;
const pagesPattern = /^[1-9][0-9]{0,4}$/;


const myLibrary = [];
let i = 0;

function addBook(){
    event.preventDefault();

    const bookName = document.querySelector("#book_name").value;
    const author = document.querySelector("#author").value;
    const nbPages = document.querySelector("#nb_pages").value;
    const isRead = document.querySelector("#status").checked;

    const titleError = document.getElementById("title_error");
    const authorError = document.getElementById("authorError");
    const pagesError = document.getElementById("pagesError");
    console.log(bookName+" "+author+" "+nbPages);

    
    let correct=0
        
        if (titlePattern.test(bookName)) {
            titleError.textContent = ""; // Clear any previous error
            correct++;
        } else {
            titleError.textContent = "Please fill the book name correctly."; // Show error message
        }
        if (authorPattern.test(author)) {
            authorError.textContent = ""; // Clear any previous error
            correct++;
        } else {
            authorError.textContent = "Please fill the author name correctly."; // Show error message
        }
        if (pagesPattern.test(nbPages)) {
            pagesError.textContent = ""; // Clear any previous error
            correct++;
        } else {
            pagesError.textContent = "Please enter a valid number of pages."; // Show error message
        }
        if(correct ===3){
            function book(title,author,Pages,isRead){
                
                this.bookName=title;
                this.author=author;
                this.nbPages=Pages;
                this.isRead=isRead;
                this.addBookToLibrary = function(){
                    myLibrary[i]=this;
                    i++;
                }
            }
            const Book=new book(bookName,author,nbPages,isRead);
            Book.addBookToLibrary();
            dialog.close();
            displayBooks();
        }
}

function displayBooks(){
    const libraryDisplay =document.getElementById("display");
    libraryDisplay.innerHTML = "";
    myLibrary.forEach((book,index)=>{

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
    });
}

function readBook(index){
    myLibrary[index].isRead = !myLibrary[index].isRead;
    displayBooks();
}

function deleteBook(index){
    myLibrary.splice(index,1);
    displayBooks();
}