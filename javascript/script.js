import Swiper from "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs";

const blogsSection = document.querySelector(".blogs-section");
const blogContainer = document.querySelector(".blogs-container");
const offersContainer = document.querySelector(".swiper-wrapper");
const headerDiv = document.querySelector(".header-div");
const userLogo = document.querySelector(".user-logo");
const hamburgerLogo = document.querySelector(".hamburger-logo");

function handleScroll() {
  if (window.scrollY > 0) {
    headerDiv.classList.add("scrolled");
    userLogo.src = "images/User_01.svg";
    hamburgerLogo.src = "images/hamburger_LG.svg";
  } else {
    headerDiv.classList.remove("scrolled");
    userLogo.src = "images/User_landing.svg";
    hamburgerLogo.src = "images/Hamburger_landing.svg";
  }
}

window.addEventListener("scroll", handleScroll);

document.addEventListener("DOMContentLoaded", async () => {
  const response = await fetch("json/TourOffersData.json");
  const TourOffersData = await response.json();
  const doubledData = TourOffersData.concat(TourOffersData);

  function showTour(data) {
    offersContainer.innerHTML = "";

    data.forEach((currentIndex) => {
      const tourOfferDiv = document.createElement("div");
      tourOfferDiv.classList.add("swiper-slide");

      const img = document.createElement("img");
      img.src = currentIndex.image;

      const header = document.createElement("h3");
      header.textContent = currentIndex.header;

      const info = document.createElement("p");
      info.textContent = currentIndex.info;

      const price = document.createElement("p");
      price.textContent = currentIndex.price;

      tourOfferDiv.appendChild(img);
      tourOfferDiv.appendChild(header);
      tourOfferDiv.appendChild(info);
      tourOfferDiv.appendChild(price);

      offersContainer.appendChild(tourOfferDiv);
    });
  }

  showTour(doubledData);

  const swiper = new Swiper(".swiper", {
    direction: "horizontal",

    spaceBetween: 40,
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

const mainContainer = document.querySelector(".main-container");

document.addEventListener("DOMContentLoaded", async () => {
  const response = await fetch("./json/discover-services.json");
  const data = await response.json();

  data.forEach((item) => {
    const section = document.createElement("section");
    section.classList.add("main-intro-section");

    const img = document.createElement("img");
    img.src = item.image;
    img.alt = "main-picture";

    const h2 = document.createElement("h2");
    h2.textContent = item.header;

    const p = document.createElement("p");
    p.textContent = item.p;

    section.appendChild(img);
    section.appendChild(h2);
    section.appendChild(p);

    mainContainer.appendChild(section);
  });
});

document.addEventListener("DOMContentLoaded", async () => {
  const response = await fetch("./json/blogData.json");
  const blogData = await response.json();

  let dataIndex = 0;
  for (let i = 1; i <= 6; i++) {
    let blogDiv = document.createElement("div");
    blogDiv.className = "blogs-div";

    let currentIndex = blogData[dataIndex];

    let img = document.createElement("img");
    img.src = currentIndex.image;

    let p = document.createElement("p");
    p.textContent = currentIndex.text;

    if (i > 4) {
      blogDiv.classList = "last-blog-div";
    }

    blogDiv.appendChild(img);
    blogDiv.appendChild(p);

    blogContainer.appendChild(blogDiv);

    dataIndex = (dataIndex + 1) % blogData.length;
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const bookSections = document.querySelectorAll(".book-section-div");

  let openIndex = null;

  bookSections.forEach((bookSection, index) => {
    const bookingText = bookSection.querySelector(".booking-text");
    const locationsDiv = bookSection.querySelector(".locations-div");

    bookingText.addEventListener("click", () => {
      const jsonFilePath = `./json/Tour-section-${index + 1}.json`;

      if (openIndex !== null && openIndex !== index) {
        const prevLocationsDiv =
          bookSections[openIndex].querySelector(".locations-div");
        prevLocationsDiv.style.display = "none";
        const prevBookArrow =
          bookSections[openIndex].querySelector(".book-arrow");
        prevBookArrow.style.transform = "rotate(0deg)";
      }

      if (locationsDiv.innerHTML === "") {
        fetch(jsonFilePath)
          .then((response) => response.json())
          .then((locations) => {
            locations.forEach((data) => {
              const p = document.createElement("p");
              switch (index + 1) {
                case 1:
                case 2:
                  p.textContent = `${data.country}, ${data.city}`;
                  break;
                case 3:
                  p.textContent = `Departure: ${data.departure_date}. Arrival ${data.arrival_date}`;
                  break;
                case 4:
                  p.textContent = ` ${data.amount}`;
                  break;
                default:
                  p.textContent = "Unknown Location";
              }
              p.style.padding = "15px 0";
              p.style.borderTop = "1px solid rgba(66, 66, 68, 0.60)";
              locationsDiv.appendChild(p);

              p.addEventListener("click", () => {
                bookingText.querySelector("p").textContent = p.textContent;
                locationsDiv.style.display = "none";
                const bookArrow = bookSection.querySelector(".book-arrow");
                bookArrow.style.transform = "rotate(0deg)";
              });
            });

            locationsDiv.style.display = "block";
            const bookArrow = bookSection.querySelector(".book-arrow");
            bookArrow.style.transform = "rotate(180deg)";
            openIndex = index;
          })
          .catch((error) =>
            console.error("Error fetching locations data:", error)
          );
      } else {
        locationsDiv.style.display =
          locationsDiv.style.display === "none" ? "block" : "none";
        const bookArrow = bookSection.querySelector(".book-arrow");
        bookArrow.style.transform =
          locationsDiv.style.display === "none"
            ? "rotate(0deg)"
            : "rotate(180deg)";
        openIndex = locationsDiv.style.display === "none" ? null : index;
      }
    });
  });
});
