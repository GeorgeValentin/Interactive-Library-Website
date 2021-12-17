window.onload = () => {
  //* Trending Section

  // -> Select the DOM elements
  let bookImg = document.querySelectorAll(".book-image");
  let bookOverlay = document.querySelectorAll(".book-overlay");
  let buttonAddReadingList = document.querySelectorAll(
    ".btn-add-to-reading-list"
  );

  let readingListContainer = document.querySelector(".reading-list-container");
  let dropDownReadingList = document.querySelector(".reading-list-drop-down");

  let btnBook1 = document.querySelector(".btn1");
  let btnBook2 = document.querySelector(".btn2");
  let btnBook3 = document.querySelector(".btn3");
  let btnBook4 = document.querySelector(".btn4");

  let readingList = [];

  let myBooks = [
    "Beautiful World Where are you?",
    "One Last Stop",
    "The Love Songs of W.E.B. du Bois",
    " Billy Summers",
  ];

  // -> Animate Overlay
  // Animate the book information (add the overlay on top of the books)
  function animateOverlay(backgroundImage, overlay) {
    for (let index = 0; index < backgroundImage.length; index++) {
      // Bring the overlay up (on top of the image)
      backgroundImage[index].addEventListener("mouseover", () => {
        overlay[index].style.opacity = "1";
        overlay[index].style.transition = "all 400ms ease-in-out";
      });

      // Put the overlay back (behind the image)
      backgroundImage[index].addEventListener("mouseout", () => {
        overlay[index].style.opacity = "0";
        overlay[index].style.transition = "all 400ms ease-in-out";
      });
    }
  }

  // -> Make the button stay pressed after clicking it
  function makeTheAddButtonStayPressed(arrayOfButtons) {
    for (let index = 0; index < arrayOfButtons.length; index++) {
      arrayOfButtons[index].addEventListener("click", () => {
        // Make the button stay pressed after you press it
        arrayOfButtons[index].classList.add("btn-pressed");
        arrayOfButtons[index].innerHTML = "Added";
      });
    }
  }

  // -> Toggle the display property of the readingList
  // Check if the readingList has elements or not and toggle display for the list accordingly
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

  // -> Add books to reading list
  function addToReadingList(
    listOfBooks,
    pressedButton,
    dropDownList,
    bookIndex
  ) {
    pressedButton.addEventListener("click", () => {
      listOfBooks.push(myBooks[bookIndex]);
      pressedButton.classList.add("disabled-button");
      addToDropDown(listOfBooks, dropDownList);
      checkListAndDisplay(readingList);
    });
  }

  // -> Add book to drop-down
  function addToDropDown(listOfBooks, dropDownList) {
    let divToAdd = document.createElement("div");

    for (let i = 0; i < listOfBooks.length; i++) {
      divToAdd.innerHTML = readingList[i];
      divToAdd.classList.add("drop-down-elem");

      dropDownList.appendChild(divToAdd);
    }
  }

  // -> Add the clear button as a child to the dropDownContainer
  function appendClearButtonToList(dropDownListContent, readingListContainer) {
    var btnClearList = document.querySelector(".btn-clear-list");
    readingListContainer.addEventListener("mouseenter", () => {
      dropDownListContent.appendChild(btnClearList);
    });

    return btnClearList;
  }

  // -> Make the button's styles as it was before being pressed
  function reverseAddButtonStyles(addButtonArray) {
    for (let i = 0; i < addButtonArray.length; i++) {
      addButtonArray[i].classList.remove("disabled-button");
      addButtonArray[i].classList.remove("btn-pressed");
    }
  }

  function reverseAddButtonText(addButtonArray) {
    for (let i = 0; i < addButtonArray.length; i++) {
      let btnText = document.createElement("button");
      let fai = document.createElement("i");
      btnText.innerHTML = "Reading List";
      fai.classList.add("reading-list-bookmark");
      fai.classList.add("fa-bookmark");
      fai.classList.add("far");
      btnText.appendChild(fai);
      buttonAddReadingList[i].innerHTML = btnText.innerHTML;
    }
  }

  function removeListElementsAndContainer(
    dropDownReadingList,
    readingListContainer,
    btnClear
  ) {
    // -> remove the children of the container (=> the books divs from the readingList)
    while (dropDownReadingList.firstChild) {
      dropDownReadingList.removeChild(dropDownReadingList.firstChild);

      // -> prevent the removal of the clear button
      if (dropDownReadingList.childNodes == btnClear) {
        break;
      }
    }

    // -> After the list is empty, remove it
    readingListContainer.style.display = "none";
  }

  function main() {
    animateOverlay(bookImg, bookOverlay);
    makeTheAddButtonStayPressed(buttonAddReadingList);

    // add Books to readingList
    addToReadingList(readingList, btnBook1, dropDownReadingList, 0);
    addToReadingList(readingList, btnBook2, dropDownReadingList, 1);
    addToReadingList(readingList, btnBook3, dropDownReadingList, 2);
    addToReadingList(readingList, btnBook4, dropDownReadingList, 3);

    let btnClearList = appendClearButtonToList(
      dropDownReadingList,
      readingListContainer
    );

    btnClearList.addEventListener("click", () => {
      reverseAddButtonStyles(buttonAddReadingList);
      reverseAddButtonText(buttonAddReadingList);

      removeListElementsAndContainer(
        dropDownReadingList,
        readingListContainer,
        btnClearList
      );
    });
  }

  main();
};
