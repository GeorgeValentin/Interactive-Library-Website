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
        arrayOfButtons[index].textContent = "Added";
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
      divToAdd.textContent = readingList[i];
      divToAdd.classList.add("drop-down-elem");

      dropDownList.appendChild(divToAdd);
    }
  }

  // -> Add the clearButton as a child to the dropDownContainer
  // -> This button will empty the list
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

  // -> Set the text for the add buttons back to Reading List and the font awesome icon
  function reverseAddButtonText(addButtonArray) {
    for (let i = 0; i < addButtonArray.length; i++) {
      let btnText = document.createElement("button");
      let fontAwesomeIcon = document.createElement("i");
      btnText.textContent = "Reading List";
      fontAwesomeIcon.classList.add("reading-list-bookmark");
      fontAwesomeIcon.classList.add("fa-bookmark");
      fontAwesomeIcon.classList.add("far");
      btnText.appendChild(fontAwesomeIcon);
      buttonAddReadingList[i].textContent = btnText.textContent;
    }
  }

  // -> Remove the list elements and as the list is now empty remove it as well
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

  //* Movie Carousel Section
  const movieCarousel = document.querySelector("#movies-carousel");
  const movies = document.querySelectorAll(".movie-trailer");
  const carouselItems = document.querySelectorAll(".carousel-item");
  const playButton = document.querySelectorAll(".play-button");
  const pauseButton = document.querySelectorAll(".pause-button");

  function pausePrevTrailerAfterSliding(carousel, carouselElements, movies) {
    // this event is triggered after the sliding is complete
    carousel.addEventListener("slid.bs.carousel", () => {
      for (let i = 0; i < carouselElements.length; i++) {
        // check to see which is the active carousel element
        if (carouselItems[i].classList.contains("active")) {
          // pause the trailer with the last index when sliding back to the first indexed one
          // -> when index = 0 => pause the last video (we have written this for the case when we go from the last index back to the first index)
          if (i === 0) {
            movies[movies.length - 1].pause();
          }
          // otherwise pause the previous video
          else {
            movies[i - 1].pause();
          }
        }
      }
    });
  }

  function hideButton(buttonToHide) {
    buttonToHide.style.display = "none";
  }

  function hideOneButtonAndShowAnother(showButton, hideButton) {
    showButton.style.display = "block";
    hideButton.style.display = "none";
  }

  function playTrailer(deviceTypeEvent, beginningEvent, endingEvent) {
    for (let i = 0; i < movies.length; i++) {
      // play on click video screen
      movies[i].addEventListener(deviceTypeEvent, () => {
        // if the movies is paused
        if (movies[i].paused) {
          // show the playButton directly and also when entering the video container after previously leaving it
          hideOneButtonAndShowAnother(pauseButton[i], playButton[i]);
          movies[i].addEventListener(beginningEvent, () => {
            hideOneButtonAndShowAnother(pauseButton[i], playButton[i]);
          });
        }
        // if the movie is playing
        else {
          // show the pause button
          hideOneButtonAndShowAnother(playButton[i], pauseButton[i]);

          // show the pauseButton directly and also when entering the video container after previously leaving it
          movies[i].addEventListener(beginningEvent, () => {
            hideOneButtonAndShowAnother(playButton[i], pauseButton[i]);
          });
        }

        // when leaving the video container hide both buttons
        movies[i].addEventListener(endingEvent, () => {
          hideButton(pauseButton[i]);
          hideButton(playButton[i]);
        });
      });
    }
  }

  function playTrailerUsingTouch(eventType) {
    for (let i = 0; i < movies.length; i++) {
      movies[i].addEventListener(eventType, () => {
        // if the movie is paused play it and hide the buttons
        if (movies[i].paused) {
          movies[i].play();
          hideButton(playButton[i]);
          hideButton(pauseButton[i]);
        }
        // if the movie is playing pause it and show the playButton
        else {
          movies[i].pause();
          hideOneButtonAndShowAnother(playButton[i], pauseButton[i]);
        }
      });
    }
  }

  function moviesCarouselSectionMain() {
    pausePrevTrailerAfterSliding(movieCarousel, carouselItems, movies);
    playTrailer("click", "mouseenter", "mouseleave");
    playTrailerUsingTouch("touchstart");
  }

  moviesCarouselSectionMain();

  //* Media Partners Section
  const partners = document.querySelectorAll(".partner");

  function createSoundObjects(mp3File) {
    let soundObject = new Audio("../resources/sounds/" + mp3File + ".mp3");
    return soundObject;
  }

  function playSound(element) {
    switch (element) {
      case "vodafone-logo":
        let vodafoneSound = createSoundObjects("vodafone_sound");
        vodafoneSound.play();
        break;

      case "intel-logo":
        let intelSound = createSoundObjects("intel_sound");
        intelSound.play();
        break;

      case "microsoft-logo":
        let microsoftSound = createSoundObjects("microsoft_sound");
        microsoftSound.play();
        break;

      case "orange-logo":
        let orangeSound = createSoundObjects("orange_sound");
        orangeSound.play();
        break;

      case "telekom-logo":
        let telekomSound = createSoundObjects("telekom_sound");
        telekomSound.play();
        break;

      case "snapchat-logo":
        let snapchatSound = createSoundObjects("snapchat_sound");
        snapchatSound.play();
        break;
    }
  }

  function playSoundOnInteraction(arrOfElements, userEvent) {
    for (let i = 0; i < arrOfElements.length; i++) {
      arrOfElements[i].addEventListener(userEvent, () => {
        let logoClass = arrOfElements[i].childNodes[1].classList[0];
        playSound(logoClass);
      });
    }
  }

  function mediaPartnersSectionMain() {
    playSoundOnInteraction(partners, "click");
  }

  mediaPartnersSectionMain();
};
