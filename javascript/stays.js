import Swiper from "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs";

const searchButton = document.querySelector(".search-button");
const mainSection = document.querySelector(".main-section");
const optionsSection = document.querySelector(".options-section");
const body = document.querySelector("body");
const hotelsSection = document.querySelector(".hotels-container");
const hotelCity = document.querySelector(".hotel-city");
const hotelInfo = document.querySelector(".hotel-info p");
const showMoreButton = document.querySelector(".show-more-button");
const propertyType = document.querySelector(".swiper-wrapper-second");
const propertyTypeSection = document.querySelector(".property-type-section");

let datePicked;
datePicked = document.getElementById("datepicker").value;
let clicked = false;

searchButton.addEventListener("click", () => {
  datePicked = document.getElementById("datepicker").value;

  if (datePicked && !clicked && hotelCity.textContent !== "Choose city") {
    clicked = true;
    const randomNumber = Math.floor(Math.random() * 2001) + 1000;
    propertyTypeSection.style.display = "none";

    hotelInfo.textContent = `${hotelCity.textContent}: ${randomNumber} properties found`;

    if (window.innerWidth < 1025) {
      mainSection.style.display = "flex";
      optionsSection.style.display = "none";
      filterAside.style.width = "0";

      createDivs(hotelsSection, 5);
    } else {
      createDivs(hotelsSection, 8);

      mainSection.style.display = "flex";
    }

    body.style.height = "100%";
  }
});

function createDivs(parentElement, numberOfDivs) {
  fetch("../json/hotels.json")
    .then((response) => response.json())
    .then((data) => {
      for (let i = 0; i < numberOfDivs; i++) {
        const div = document.createElement("div");
        div.classList.add("hotel-card");
        div.style.backgroundColor = "white";

        const imgDiv = document.createElement("div");
        const hotelImg = document.createElement("img");
        imgDiv.classList.add("hotel-img");
        hotelImg.src = data[0].image;

        imgDiv.appendChild(hotelImg);

        div.appendChild(imgDiv);

        const hotelInfo = document.createElement("div");
        hotelInfo.classList.add("hotel-details");

        const infoContainer = document.createElement("div");
        infoContainer.classList.add("info-container");

        const leftInfo = document.createElement("div");
        leftInfo.classList.add("left-info");

        const hotelType = document.createElement("h2");
        let cityText = hotelCity.textContent;
        let parts = cityText.split(",");
        let country = parts[parts.length - 1].trim();
        let city = parts
          .slice(0, parts.length - 1)
          .join(",")
          .trim();
        hotelType.textContent = `${country} Resort`;

        leftInfo.appendChild(hotelType);

        const hotelPlace = document.createElement("p");
        hotelPlace.textContent = `${country}, ${city}`;
        hotelPlace.classList.add("hotel-opacity");

        leftInfo.appendChild(hotelPlace);

        const hotelDinstance = document.createElement("p");
        hotelDinstance.textContent = data[0].distance;
        hotelDinstance.classList.add("hotel-opacity");

        leftInfo.appendChild(hotelDinstance);

        const hotelDescription = document.createElement("p");
        hotelDescription.textContent = data[0].description;
        hotelDescription.classList.add("hotel-opacity");

        leftInfo.appendChild(hotelDescription);

        const rightInfo = document.createElement("div");
        rightInfo.classList.add("right-info");

        const rating = document.createElement("div");
        rating.classList.add("hotel-rating");
        const ratingP = document.createElement("p");

        ratingP.textContent = `${data[0].rating}: `;
        const ratingStars = document.createElement("span");
        for (let i = 0; i < 5; i++) {
          const star = document.createElement("img");
          star.src = data[0].star;
          ratingStars.appendChild(star);
        }

        rating.appendChild(ratingP);
        rating.appendChild(ratingStars);

        rightInfo.appendChild(rating);

        const price = document.createElement("div");
        price.classList.add("hotel-price");

        const priceP = document.createElement("p");
        priceP.textContent = `${data[0].priceP}: `;

        const priceValue = document.createElement("p");
        priceValue.textContent = data[0].price;

        price.appendChild(priceP);
        price.appendChild(priceValue);

        rightInfo.appendChild(price);

        const hotelButton = document.createElement("button");
        hotelButton.classList.add("hotel-button");
        hotelButton.textContent = data[0].buttonText;

        hotelButton.addEventListener("click", () => {
          window.location.href = "../pages/hotelBook.html";
        });

        infoContainer.appendChild(leftInfo);
        infoContainer.appendChild(rightInfo);
        hotelInfo.appendChild(infoContainer);
        hotelInfo.appendChild(hotelButton);

        div.appendChild(hotelInfo);

        parentElement.appendChild(div);
      }
    })
    .catch((error) => console.error("Error fetching JSON:", error));
}

showMoreButton.addEventListener("click", () => {
  createDivs(hotelsSection, 5);
});

const filterButton = document.querySelector(".filter-button");
const filterAside = document.querySelector(".filter-aside");
const filterClose = document.querySelector(".filter-button-arrow");
const footer = document.querySelector("footer");
const headerHeight = document.querySelector("header").offsetHeight;
const filterButtonHeight = filterButton.offsetHeight;

filterButton.addEventListener("click", () => {
  filterAside.style.width = "100%";
  filterClose.style.display = "block";
  document.documentElement.style.overflowY = "hidden";
});

filterClose.addEventListener("click", () => {
  filterAside.style.width = "0";
  filterClose.style.display = "none";
  document.documentElement.style.overflowY = "scroll";
});

window.addEventListener("resize", () => {
  if (window.innerWidth < 1025 && clicked) {
    filterAside.style.top = `55px`;
    filterAside.style.width = "0";
    optionsSection.style.display = "none";
  } else if (window.innerWidth < 1025 && window.innerWidth >= 601) {
    optionsSection.style.display = "grid";
  } else if (window.innerWidth > 1025) {
    filterAside.style.top = "0";
    filterAside.style.display = "block";
    filterAside.style.width = "100%";
    filterAside.style.paddingTop = "32px";
    optionsSection.style.display = "flex";
  }
});

if (window.innerWidth < 1025) {
  filterAside.style.top = `55px`;
} else {
  filterAside.style.paddingTop = "32px";
}

document.addEventListener("DOMContentLoaded", async () => {
  const response = await fetch("../json/property-type.json");
  const propertyOfferData = await response.json();
  const doubledData = propertyOfferData.concat(propertyOfferData);

  function showTour(data) {
    propertyType.innerHTML = "";

    data.forEach((currentIndex) => {
      const propertyTypeDiv = document.createElement("div");
      propertyTypeDiv.classList.add("swiper-slide");

      const img = document.createElement("img");
      img.src = currentIndex.image;

      const header = document.createElement("h3");
      header.textContent = currentIndex.info;

      propertyTypeDiv.appendChild(img);
      propertyTypeDiv.appendChild(header);

      propertyType.appendChild(propertyTypeDiv);
    });
  }

  showTour(doubledData);

  const swiper = new Swiper(".swiper2", {
    direction: "horizontal",

    spaceBetween: 20,
    loop: true,
    watchOverflow: false,

    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },

    breakpoints: {
      601: {
        slidesPerView: 2,
      },
      1025: {
        slidesPerView: 4,
      },
    },
  });
});
