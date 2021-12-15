window.onload = () => {
  //* Trending Section
  // -> Select all elements with the specific classes => arrays of book-rating and book-image
  let bookRating = document.querySelectorAll(".book-rating");
  let bookImg = document.querySelectorAll(".book-image");
  let bookOverlay = document.querySelectorAll(".book-overlay");
  let buttonAddReadingList = document.querySelectorAll(
    ".btn-add-to-reading-list"
  );
  let booksAdded = document.querySelectorAll(".book-added");

  var readingListContainer = document.querySelector(".reading-list-container");
  var dropDownReadingList = document.querySelector(".reading-list-drop-down");

  var btnBook1 = document.querySelector(".btn1");
  var btnBook2 = document.querySelector(".btn2");
  var btnBook3 = document.querySelector(".btn3");
  var btnBook4 = document.querySelector(".btn4");

  let selectedBook = "";

  let booksArray = [
    "Beautiful World Where are you?",
    "One Last Stop",
    "The Love Songs of W.E.B. du Bois",
    "Billy Summers  ",
  ];
  var readingList = [];

  // Animate the book information
  for (let index = 0; index < bookRating.length; index++) {
    // Bring the overlay up (on top of the image)
    bookImg[index].addEventListener("mouseover", () => {
      bookOverlay[index].style.opacity = "1";
      bookOverlay[index].style.transition = "all 400ms ease-in-out";
    });

    // Put the overlay back (behind the image)
    bookImg[index].addEventListener("mouseout", () => {
      bookOverlay[index].style.opacity = "0";
      bookOverlay[index].style.transition = "all 400ms ease-in-out";
    });
  }

  function addBooks() {
    // Adding to reading list books
    btnBook1.addEventListener("click", () => {
      selectedBook = booksArray[0];
      let bookToAdd = document.createElement("div");
      bookToAdd.classList.add("book-added");
      bookToAdd.innerHTML = selectedBook;
      readingList.push(selectedBook);
      dropDownReadingList.appendChild(bookToAdd);
    });

    btnBook2.addEventListener("click", () => {
      selectedBook = booksArray[1];
      let bookToAdd = document.createElement("div");
      bookToAdd.classList.add("book-added");
      bookToAdd.innerHTML = selectedBook;
      readingList.push(selectedBook);
      dropDownReadingList.appendChild(bookToAdd);
    });

    btnBook3.addEventListener("click", () => {
      selectedBook = booksArray[2];
      let bookToAdd = document.createElement("div");
      bookToAdd.classList.add("book-added");
      bookToAdd.innerHTML = selectedBook;
      readingList.push(selectedBook);
      dropDownReadingList.appendChild(bookToAdd);
    });

    btnBook4.addEventListener("click", () => {
      selectedBook = booksArray[3];
      let bookToAdd = document.createElement("div");
      bookToAdd.classList.add("book-added");
      bookToAdd.innerHTML = selectedBook;
      readingList.push(selectedBook);
      dropDownReadingList.appendChild(bookToAdd);
    });
  }
  // Check if the readingList has elements or not
  function checkListAndDisplay(readingList) {
    // The readingList is empty
    if (readingList.length !== 0) {
      // Hide it
      readingListContainer.style.display = "block";
    } else {
      // Otherwise show it
      readingListContainer.style.display = "none";
    }
  }
  addBooks();

  for (let index = 0; index < buttonAddReadingList.length; index++) {
    buttonAddReadingList[index].addEventListener("click", () => {
      // Make the button stay pressed after you press it
      buttonAddReadingList[index].classList.add("btn-pressed");
      buttonAddReadingList[index].innerHTML = "Added";

      checkListAndDisplay(readingList);
    });
  }
};
