const showMore = document.querySelector(".show-more");
const showLess = document.querySelector(".show-less");
const hotelDetails = document.querySelector(".hotel-details");
const additionalInfo = document.querySelector(".additional-info");
const mainInfo = document.querySelector(".hotel-main-info");
const mainPhotos = document.querySelector(".hotel-main-photos");
const secondaryPhotos = document.querySelector(".hotel-secondary-photos");
const hotelPrices = document.querySelector(".hotel-prices");
const hotelMainInfo = document.querySelector(".hotel-main-details");

document.addEventListener("DOMContentLoaded", () => {
  fetch("../json/hotel-book.json")
    .then((response) => response.json())
    .then((data) => {
      const hotelData = document.createElement("div");
      hotelData.classList.add("hotel-data");

      const hotelType = document.createElement("h2");
      hotelType.textContent = data.details.type;

      const hotelLocation = document.createElement("span");
      hotelLocation.classList.add("hotel-location");
      const pinImg = document.createElement("img");
      pinImg.src = data.details.pin;

      const adress = document.createElement("p");
      adress.textContent = data.details.adress;

      hotelLocation.appendChild(pinImg);
      hotelLocation.appendChild(adress);

      hotelData.appendChild(hotelType);
      hotelData.appendChild(hotelLocation);

      const hotelRating = document.createElement("div");
      hotelRating.classList.add("hotel-rating");

      const ratingP = document.createElement("p");
      ratingP.textContent = `${data.details.rating}: `;

      const icons = document.createElement("div");
      icons.classList.add("rating-icons");

      const ratingStars = document.createElement("span");

      for (let i = 0; i < 5; i++) {
        const star = document.createElement("img");
        star.src = data.details.star;
        ratingStars.appendChild(star);
      }

      icons.appendChild(ratingStars);

      const heartImg = document.createElement("img");
      heartImg.src = data.details.heart;
      icons.appendChild(heartImg);

      const shareImg = document.createElement("img");
      shareImg.src = data.details.share;
      icons.appendChild(shareImg);

      hotelRating.appendChild(ratingP);
      hotelRating.appendChild(icons);

      mainInfo.appendChild(hotelData);
      mainInfo.appendChild(hotelRating);

      const mainImgDiv = document.createElement("div");
      mainImgDiv.classList.add("main-img-div");

      const mainPhoto = document.createElement("img");
      mainPhoto.classList.add("main-photo");
      mainPhoto.src = data.main_photos[0].url;

      mainImgDiv.appendChild(mainPhoto);

      const PhotoContainer = document.createElement("div");
      PhotoContainer.classList.add("photo-container");

      const secondPhoto = document.createElement("img");
      secondPhoto.src = data.main_photos[1].url;

      const thirdPhoto = document.createElement("img");
      thirdPhoto.src = data.main_photos[2].url;

      PhotoContainer.appendChild(secondPhoto);
      PhotoContainer.appendChild(thirdPhoto);

      mainPhotos.appendChild(mainImgDiv);
      mainPhotos.appendChild(PhotoContainer);

      data.secondary_photos.forEach((photo) => {
        const photoDiv = document.createElement("div");
        photoDiv.classList.add("secondaty-photo-div");

        const img = document.createElement("img");
        img.src = photo.url;

        photoDiv.appendChild(img);

        if (photo.p) {
          const remainingPhotos = document.createElement("p");
          remainingPhotos.textContent = photo.p;
          photoDiv.appendChild(remainingPhotos);
        }

        secondaryPhotos.appendChild(photoDiv);
      });

      const pricesDiv = document.createElement("div");
      pricesDiv.classList.add("prices-div");

      const rentPrice = document.createElement("div");
      rentPrice.classList.add("price");
      rentPrice.textContent = `Price: ${data.details.price}`;

      pricesDiv.appendChild(rentPrice);

      const totalPrice = document.createElement("div");
      totalPrice.classList.add("price");
      totalPrice.textContent = `Total price: ${data.details.total}`;

      pricesDiv.appendChild(totalPrice);

      const bookNow = document.createElement("button");
      bookNow.classList.add("book-now-button");
      bookNow.textContent = "Book Now";
      bookNow.style.padding = "0";

      hotelPrices.appendChild(pricesDiv);
      hotelPrices.appendChild(bookNow);

      hotelMainInfo.textContent = data.details.info;
    });
});

let clicked = false;

showMore.addEventListener("click", () => {
  clicked = true;
  additionalInfo.style.display = "flex";
  showMore.style.display = "none";
  document.body.style.height = "100%";
});

showLess.addEventListener("click", () => {
  clicked = false;
  additionalInfo.style.display = "none";
  showMore.style.display = "flex";
  document.body.style.height = "100%";
});

window.addEventListener("load", () => {
  if (window.innerWidth > 1025) {
    document.body.style.height = "100%";
  }
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 1025) {
    document.body.style.height = "100%";
    additionalInfo.style.display = "flex";
    showMore.style.display = "none";
    clicked = true;
  } else if (window.innerWidth < 1025 && clicked) {
  }
});
