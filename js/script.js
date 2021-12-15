window.onload = () => {
  //* Trending Section
  // -> Select all elements with the specific classes => arrays of book-rating and book-image
  let bookRating = document.querySelectorAll(".book-rating");
  let bookImg = document.querySelectorAll(".book-image");
  let bookOverlay = document.querySelectorAll(".book-overlay");
  let bookInfo = document.querySelectorAll(".book-info");

  for (let index = 0; index < bookRating.length; index++) {
    // bring the overlay up (on top of the image)
    bookImg[index].addEventListener("mouseover", () => {
      bookOverlay[index].style.opacity = "1";
      bookOverlay[index].style.transition = "all 400ms ease-in-out";
    });

    // put the overlay back (behind the image)
    bookImg[index].addEventListener("mouseout", () => {
      bookOverlay[index].style.opacity = "0";
      bookOverlay[index].style.transition = "all 400ms ease-in-out";
    });
  }
};
