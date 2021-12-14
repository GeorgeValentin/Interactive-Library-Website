window.onload = () => {
  //* Trending Section
  // -> Select all elements with the specific classes => arrays of book-rating and book-image
  let bookRating = document.querySelectorAll(".book-rating");
  let bookImg = document.querySelectorAll(".book-image");

  for (let index = 0; index < bookRating.length; index++) {
    // -> on mouseover bring the ratings down from behind the image
    bookImg[index].addEventListener("mouseover", () => {
      bookRating[index].style.transform = "translateY(15%)";
      bookRating[index].style.transition = "transform 150ms ease-in-out";
      bookRating[index].style.zIndex = 1;
    });

    // -> on mouseout put the ratings back behind the image
    bookImg[index].addEventListener("mouseout", () => {
      bookRating[index].style.transform = "translateY(-100%)";
      bookRating[index].style.transition = "transform 150ms ease-in-out";
      bookRating[index].style.zIndex = -1;
    });
  }
};
