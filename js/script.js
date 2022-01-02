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

  let bookAuthorLink = document.querySelectorAll(".book-author-link");

  // -> Animate Overlay
  // Animate the book information (add the overlay on top of the books)
  function animateOverlay(backgroundImage, overlay) {
    for (let index = 0; index < backgroundImage.length; index++) {
      // Bring the overlay up (on top of the image)
      backgroundImage[index].addEventListener("mouseover", () => {
        overlay[index].style.opacity = "1";
        overlay[index].style.transition = "all 400ms ease-in-out";

        bookAuthorLink[index].style.pointerEvents = "all";
      });

      // Put the overlay back (behind the image)
      backgroundImage[index].addEventListener("mouseout", () => {
        overlay[index].style.opacity = "0";
        overlay[index].style.transition = "all 400ms ease-in-out";

        bookAuthorLink[index].style.pointerEvents = "none";
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

  function trendingSectionMain() {
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

  trendingSectionMain();

  //* Personalized Recommendation Canvas Section

  // Setup the canvas container and context
  let canvas = document.querySelector(".recommendations-canvas");
  let canvasContext = canvas.getContext("2d");
  canvas.width = 455;
  canvas.height = 210;

  // Create variables
  let canvasBackground = new Image();
  let question = new String();
  let recommendedBook = new String();
  let recomBookAuthor = new String();
  let answer1 = new String();
  let answer2 = new String();
  let answer3 = new String();

  let questionNumber = 0;
  let clickY = 0;

  // variables storing the state of the answers
  // 0 - not picked
  // 1 - picked by the user
  let q1AnsPicked1 = 0;
  let q1AnsPicked2 = 0;
  let q1AnsPicked3 = 0;

  let q2AnsPicked1 = 0;
  let q2AnsPicked2 = 0;
  let q2AnsPicked3 = 0;

  let q3AnsPicked1 = 0;
  let q3AnsPicked2 = 0;
  let q3AnsPicked3 = 0;

  const questions = [
    "What is you favourite genre?",
    "Which author do you prefer?",
    "What is the last book read?",
  ];

  const answers = [
    // answers to Question 1
    ["Science Fiction", "Action and Adventure", "Drama"],

    // answers to Question 2
    ["George R.R. Martin", "Fyodor Dostoevsky", "Marin Preda"],

    // answers to Question 3
    ["A Dance with Dragons", "The Brothers Karamazov", "Morometii"],
  ];

  // add the canvas template image to the canvasContext
  canvasBackground.onload = () => {
    canvasContext.drawImage(canvasBackground, 0, 0);
    setQuestions();
  };

  // we can use this if we don't find anything else
  // canvasBackground.src = "../resources/images/canvas_background4.PNG";

  canvasBackground.src = "../resources/images/canvas_background.PNG";

  function setQuestions() {
    // Get the questions and answers from the arrays
    question = questions[questionNumber];
    answer1 = answers[questionNumber][0];
    answer2 = answers[questionNumber][1];
    answer3 = answers[questionNumber][2];

    canvasContext.fillStyle = "#192a56";
    // Center the text and specify its font properties
    canvasContext.textAlign = "center";
    canvasContext.font = "bold 18pt Arial";

    // Add the text to the canvas
    canvasContext.fillText(question, canvas.width / 2, 35);

    // Make the answers italic
    canvasContext.font = "italic 18pt Arial";
    canvasContext.fillText(answer1, canvas.width / 2, 90);
    canvasContext.fillText(answer2, canvas.width / 2, 140);
    canvasContext.fillText(answer3, canvas.width / 2, 195);
  }

  canvas.addEventListener("click", canvasClick, false);

  function setAnswersBasedOnClickChoice(answer1, answer2, answer3) {
    if (questionNumber === 0) {
      answer1 = 1;
    }

    if (questionNumber === 1) {
      answer2 = 1;
    }

    if (questionNumber === 2) {
      answer3 = 1;
    }

    // return an array containing the 3 answers
    return [answer1, answer2, answer3];
  }

  function canvasClick(e) {
    // -> Get the address of the offset in the Y coordinate of the mouse pointer;
    // -> The X is the entire width of the canva by default
    clickY = e.offsetY;

    //* Select the first answer based on the question being asked
    if (clickY >= 90 && clickY <= 170) {
      // assign the returned values of the function to the variables
      [q1AnsPicked1, q2AnsPicked1, q3AnsPicked1] = setAnswersBasedOnClickChoice(
        q1AnsPicked1,
        q2AnsPicked1,
        q3AnsPicked1
      );

      resetQuestion();
    }

    //* Select the second answer based on the question being asked
    if (clickY >= 182 && clickY <= 263) {
      [q1AnsPicked2, q2AnsPicked2, q3AnsPicked2] = setAnswersBasedOnClickChoice(
        q1AnsPicked2,
        q2AnsPicked2,
        q3AnsPicked2
      );

      resetQuestion();
    }

    //* Select the third answer based on the question being asked
    if (clickY >= 274 && clickY <= 352) {
      [q1AnsPicked3, q2AnsPicked3, q3AnsPicked3] = setAnswersBasedOnClickChoice(
        q1AnsPicked3,
        q2AnsPicked3,
        q3AnsPicked3
      );

      resetQuestion();
    }
  }

  function resetQuestion() {
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);
    questionNumber++;

    if (questionNumber === questions.length) {
      finishQuiz();
    } else {
      // set the new question and the new set of answers
      canvasContext.drawImage(canvasBackground, 0, 0);
      setQuestions();
    }
  }

  function finishQuiz() {
    canvas.removeEventListener("click", canvasClick, false);
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);
    canvasContext.font = "bold 18pt Cambria";
    canvasContext.textAlign = "center";
    recommendBook();
    canvasContext.fillStyle = "white";
    canvasContext.fillText(
      "We recommend you to try: ",
      canvas.width / 2,
      canvas.height / 2.75
    );
    canvasContext.fillStyle = "white";
    canvasContext.font = "italic 18pt Cambria";
    canvasContext.fillText(
      recommendedBook,
      canvas.width / 2,
      canvas.height / 2 + 25
    );
    canvasContext.fillText(
      recomBookAuthor,
      canvas.width / 2,
      canvas.height / 2 + 60
    );
  }

  function assignBookAndAuthor(canvaBookTitle, canvaBookAuthor) {
    recommendedBook = canvaBookTitle;
    recomBookAuthor = canvaBookAuthor;
  }

  // Recommend books based on the user's answers
  function handleRecommendation(
    answer1,
    answer1Book,
    answer1Author,
    answer2,
    answer2Book,
    answer2Author,
    answer3,
    answer3Book,
    answer3Author
  ) {
    switch (true) {
      case answer1 === 1:
        assignBookAndAuthor(answer1Book, answer1Author);
        break;
      case answer2 === 1:
        assignBookAndAuthor(answer2Book, answer2Author);
        break;
      case answer3 === 1:
        assignBookAndAuthor(answer3Book, answer3Author);
        break;
    }
  }

  function recommendBook() {
    // -> Science Fiction
    if (q1AnsPicked1 === 1) {
      // -> George R.R. Martin
      if (q2AnsPicked1 === 1) {
        handleRecommendation(
          q3AnsPicked1,
          '"Fire and Blood"',
          "George R.R. Martin",
          q3AnsPicked2,
          '"Dune"',
          "Frank Herbert",
          q3AnsPicked3,
          '"Shout in silence"',
          "Marina Neagu"
        );
      }

      // -> Fyodor Dostoyevsky
      if (q2AnsPicked2 === 1) {
        handleRecommendation(
          q3AnsPicked1,
          '"Aelita"',
          "by Aleksey Tolstoy",
          q3AnsPicked2,
          '"Crime and Punishment"',
          "by Fyodor Dostoyevsky",
          q3AnsPicked3,
          '"The Fall into Time"',
          "by Emil Cioran"
        );
      }

      // -> Marin Preda
      if (q2AnsPicked3 === 1) {
        handleRecommendation(
          q3AnsPicked1,
          '"The Emperor of Ice"',
          "by Ana Maria Negrila",
          q3AnsPicked2,
          '"History and Utopia"',
          "by Emil Cioran",
          q3AnsPicked3,
          '"Ion"',
          "by Liviu Rebreanu"
        );
      }
    }

    // -> Action and Adventure
    if (q1AnsPicked2 === 1) {
      // -> George R.R. Martin
      if (q2AnsPicked1 === 1) {
        handleRecommendation(
          q3AnsPicked1,
          '"The Fellowship of the Ring"',
          "by J.R.R. Tolkein",
          q3AnsPicked2,
          '"The Three Musketeers"',
          "by Alexandre Dumas",
          q3AnsPicked3,
          '"The Season of the daggers"',
          "by Serban Andrei Mazilu"
        );
      }

      // -> Fyodor Dostoyevsky
      if (q2AnsPicked2 === 1) {
        handleRecommendation(
          q3AnsPicked1,
          '"War and Peace"',
          "by Lev Tolstoy",
          q3AnsPicked2,
          '"The Idiot"',
          "by Fyodor Dostoyevsky",
          q3AnsPicked3,
          '"Notes from Underground"',
          "by Fyodor Dostoyevsky"
        );
      }

      // -> Marin Preda
      if (q2AnsPicked3 === 1) {
        handleRecommendation(
          q3AnsPicked1,
          '"The Delirium"',
          "by Marin Preda",
          q3AnsPicked2,
          '"Life as a prey"',
          "by Marin Preda",
          q3AnsPicked3,
          '"The most beloved of earthlings"',
          "by Marin Preda"
        );
      }
    }

    // -> Drama
    if (q1AnsPicked3 === 1) {
      // -> George R.R. Martin
      if (q2AnsPicked1 === 1) {
        handleRecommendation(
          q3AnsPicked1,
          '"Phantasm Time"',
          "by Ovidiu Craznic",
          q3AnsPicked2,
          '"Mara"',
          "by Ioan Slavici",
          q3AnsPicked3,
          '"The Hatchet"',
          "by Mihail Sadoveanu"
        );
      }

      // -> Fyodor Dostoyevsky
      if (q2AnsPicked2 === 1) {
        handleRecommendation(
          q3AnsPicked1,
          '"Alexandru Lapusneanul"',
          "by Costache Negruzzi",
          q3AnsPicked2,
          '"Iona"',
          "by Marin Sorescu",
          q3AnsPicked3,
          '"Childhood Memories"',
          "by Ion Creanga"
        );
      }

      // Marin Preda
      if (q2AnsPicked3 === 1) {
        handleRecommendation(
          q3AnsPicked1,
          '"Otilia\'s Riddle"',
          "by George Calinescu",
          q3AnsPicked2,
          '"A lost letter"',
          "by Ion Luca Caragiale",
          q3AnsPicked3,
          '"The Lucky Mill"',
          "by Ioan Slavici"
        );
      }
    }
  }

  //* Movie Carousel Section
  const movieCarousel = document.querySelector("#movies-carousel");
  const movies = document.querySelectorAll(".movie-trailer");
  const carouselItems = document.querySelectorAll(".carousel-item");
  const playButton = document.querySelectorAll(".play-button");
  const pauseButton = document.querySelectorAll(".pause-button");

  function handleButtonsAfterSliding(
    movie,
    playBtn,
    pauseBtn,
    videoInteractEvent
  ) {
    if (movie.paused) {
      // hideButton(pauseBtn)
      movie.addEventListener(videoInteractEvent, () => {
        hideOneButtonAndShowAnother(playBtn, pauseBtn);
      });
    } else {
      movie.addEventListener(videoInteractEvent, () => {
        hideOneButtonAndShowAnother(pauseBtn, playBtn);
      });
    }
  }

  function pausePrevTrailerAfterSliding(carousel, carouselElements, movies) {
    // this event is triggered after the sliding is complete
    carousel.addEventListener("slid.bs.carousel", () => {
      for (let i = 0; i < carouselElements.length; i++) {
        // check to see which is the active carousel element
        if (carouselItems[i].classList.contains("active")) {
          // pause the trailer with the last index when sliding back to the first indexed one
          // -> when index = 0 => pause the last video (we have written this for the case when we go from the last index back to the first index)
          switch (i) {
            case 0:
              movies[movies.length - 1].pause();
              movies[i + 1].pause();

              handleButtonsAfterSliding(
                movies[0],
                playButton[0],
                pauseButton[0],
                "mouseenter"
              );

              break;

            case 1:
              movies[i - 1].pause();
              movies[i + 1].pause();

              handleButtonsAfterSliding(
                movies[1],
                playButton[1],
                pauseButton[1],
                "mouseenter"
              );

              break;

            case 2:
              movies[i - 1].pause();
              movies[0].pause();

              handleButtonsAfterSliding(
                movies[2],
                playButton[2],
                pauseButton[2],
                "mouseenter"
              );

              break;
          }
        }
      }
    });
  }

  function hideButton(buttonToHide) {
    buttonToHide.style.display = "none";
  }

  function hideOneButtonAndShowAnother(showButton, hideButton) {
    hideButton.style.display = "none";
    showButton.style.display = "block";
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

  //* Drag and Drop Section
  let options = document.getElementsByClassName("pickup");
  let choice = document.getElementsByClassName("choice");
  let homeContainer = document.getElementById("options-home-container");
  var dragItem = null;
  let popup = document.getElementById("myPopup");
  let discountCode = document.getElementById("discount_code");
  let retryBtn = document.getElementById("retry-button");

  let option1 = document.getElementById("ans1");
  let option2 = document.getElementById("ans2");
  let option3 = document.getElementById("ans3");
  let option4 = document.getElementById("ans4");
  let option5 = document.getElementById("ans5");

  // "Drag and Drop" mobile replacement
  let inputsAnswers = document.querySelectorAll(".input-answer")
  let inputAnswer1 = document.querySelector(".answer1");
  let inputAnswer2 = document.querySelector(".answer2");
  let inputAnswer3 = document.querySelector(".answer3");
  let inputAnswer4 = document.querySelector(".answer4");
  let inputAnswer5 = document.querySelector(".answer5");

  const rand = () => {
    return Math.random().toString(36).substr(2);
  };

  const generateDiscountCode = () => {
    return rand() + rand();
  };

  for (let i of options) {
    i.addEventListener("dragstart", dragStart);
    i.addEventListener("dragend", dragEnd);
  }

  function dragStart() {
    dragItem = this;
    setTimeout(() => (this.style.display = "none"), 0);
  }

  function dragEnd() {
    setTimeout(() => (this.style.display = "block"), 0);
    dragItem = null;
  }

  for (let j of choice) {
    j.addEventListener("dragover", dragOver);
    j.addEventListener("dragenter", dragEnter);
    j.addEventListener("dragleave", dragLeave);
    j.addEventListener("drop", drop);
  }

  function drop() {
    this.style.border = "3px solid black";
    this.append(dragItem);
    checkForFinalResult();
  }

  function dragOver(e) {
    e.preventDefault();
    this.style.border = "3px dotted cyan";
  }

  function dragEnter(e) {
    e.preventDefault();
  }

  function dragLeave() {
    this.style.border = "3px solid black";
  }

  function emptyInputs(inputBox) {
    inputBox.value = ""
  }

  function retryButtonClick() {
    emptyInputs(inputAnswer1)
    emptyInputs(inputAnswer2) 
    emptyInputs(inputAnswer3) 
    emptyInputs(inputAnswer4) 
    emptyInputs(inputAnswer5) 

    for (let o of options) {
      homeContainer.append(o);
    }
    popup.classList.remove("displayPopUp");
  }

  retryBtn.addEventListener("click", retryButtonClick);

  function checkFinalMobile() {
    if(
      (inputAnswer1.value === document.getElementById("harry_potter_answer").textContent) &&
      inputAnswer2.value === document.getElementById("actor_answer").textContent &&
      inputAnswer3.value === document.getElementById("poet_answer").textContent &&
      (inputAnswer4.value === document.getElementById("seven_books_answer").textContent || inputAnswer4.value === "7") &&
      inputAnswer5.value === document.getElementById("caragiale_answer").textContent
    ) {
      playSoundAndShowDiscount();
    } 
  }

  for(let i = 0; i < inputsAnswers.length; i++) {
    inputsAnswers[i].addEventListener("focusout", () => {
      checkFinalMobile()
    })
  }

  function checkForFinalResult() {
    if (
          option1.contains(document.getElementById("harry_potter_answer")) &&
          option2.contains(document.getElementById("actor_answer")) &&
          option3.contains(document.getElementById("poet_answer")) &&
          option4.contains(document.getElementById("seven_books_answer")) &&
          option5.contains(document.getElementById("caragiale_answer"))
        ) {
      playSoundAndShowDiscount();
    } 
  }

  function playSoundAndShowDiscount() {
    discountCode.textContent = generateDiscountCode();
    popup.classList.toggle("displayPopUp");
    let winSound = createSoundObjects("tada");
    winSound.play();
  }

  //* Request Books Section
  const inputBookAuthor = document.querySelector(".input-book-author");
  const inputBookTitle = document.querySelector(".input-book-title");
  const inputUserEmail = document.querySelector(".input-user-email");
  let popupText = document.querySelector(".popup-mail-sent-text");
  const checkBoxes = document.querySelectorAll(".checkbox-input");
  const inputNumberOfVolumes = document.querySelector(
    ".number-of-volumes-input"
  );
  const btnSend = document.querySelector(".btn-send");

  function preventDigitsInput(element, inputEvent) {
    element.addEventListener(inputEvent, (e) => {
      let char = String.fromCharCode(e.which);

      // prevent the input from accepting digits
      if (/[0-9]/.test(char)) {
        e.preventDefault();
      }
    });
  }

  function sendForm(button, buttonEvent) {
    button.addEventListener(buttonEvent, () => {
      // use the HTML constraint validation API to check if the inputs are valid
      if (
        inputBookAuthor.checkValidity() &&
        inputBookTitle.checkValidity() &&
        inputNumberOfVolumes.checkValidity() &&
        inputUserEmail.checkValidity()
      ) {
        // after sending the form clear the inputs
        setTimeout(() => {
          for (let i = 0; i < checkBoxes.length; i++) {
            checkBoxes[i].checked = false;
          }
          inputBookAuthor.value = null;
          inputBookTitle.value = null;
          inputNumberOfVolumes.value = "";
          inputUserEmail.value = null;
        }, 200);

        // show the popup text
        popupText.classList.add("show");

        // after 2.5s hide it
        setTimeout(() => {
          popupText.classList.remove("show");
        }, 3500);
      }
    });
  }

  function requestBooksSectionMain() {
    preventDigitsInput(inputBookAuthor, "keydown");

    sendForm(btnSend, "click");
  }

  requestBooksSectionMain();

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

  //* Map section
  function mapSectionMain() {
    let map = L.map("mapLocation").setView([44.43225, 26.10626], 13);
    L.tileLayer(
      "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw",
      {
        maxZoom: 18,
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
          'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        id: "mapbox/streets-v11",
        tileSize: 512,
        zoomOffset: -1,
      }
    ).addTo(map);
    L.marker([44.450279, 26.077732])
      .addTo(map)
      .bindPopup("Bulevardul Alexandru Ioan Cuza 38-44, București")
      .openPopup();
    L.marker([44.432779, 26.122796])
      .addTo(map)
      .bindPopup("Calea Calarasi, București")
      .openPopup();
  }

  mapSectionMain();
};
