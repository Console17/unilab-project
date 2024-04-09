import Swiper from "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs";
const swiper1 = new Swiper("#swiper1", {
  direction: "horizontal",

  slidesPerView: 3,
  loop: false,
  spaceBetween: 10,

  // navigation: {
  //   nextEl: ".swiper-button-next",
  //   prevEl: ".swiper-button-prev",
  // },

  breakpoints: {
    601: {
      slidesPerView: 3,
    },
    1025: {
      slidesPerView: 5,
    },
  },
});

const optionsDivs = document.querySelectorAll(".options-container");

optionsDivs.forEach(function (div) {
  div.addEventListener("click", function (event) {
    const containerId = div.id;
    const parentDiv = div.parentElement;
    const options = parentDiv.querySelector(".options");

    optionsDivs.forEach(function (otherDiv) {
      if (otherDiv !== div) {
        const otherOptions = otherDiv.parentElement.querySelector(".options");
        if (otherOptions) {
          otherOptions.style.display = "none";
        }
      }
    });

    switch (containerId) {
      case "from":
        options.innerHTML = "";

        fetch("../json/Tour-section-1.json")
          .then((response) => response.json())
          .then((data) => {
            data.forEach((element) => {
              const p = document.createElement("p");
              p.textContent = element.country;
              styleP(p, options);
              p.addEventListener("click", function () {
                handleOptionClick(p, parentDiv, options);
              });
            });
          });
        break;
      case "city":
        options.innerHTML = "";

        fetch("../json/Tour-section-1.json")
          .then((response) => response.json())
          .then((data) => {
            data.forEach((element) => {
              const p = document.createElement("p");
              p.textContent = element.city + ", " + element.country;
              styleP(p, options);
              p.addEventListener("click", function () {
                handleOptionClick(p, parentDiv, options);
              });
            });
          });
        break;
      case "to":
        options.innerHTML = "";

        fetch("../json/Tour-section-2.json")
          .then((response) => response.json())
          .then((data) => {
            data.forEach((element) => {
              const p = document.createElement("p");
              p.textContent = element.country;
              styleP(p, options);
              p.addEventListener("click", function () {
                handleOptionClick(p, parentDiv, options);
              });
            });
          });
        break;
      case "people":
        options.innerHTML = "";

        fetch("../json/Tour-section-4.json")
          .then((response) => response.json())
          .then((data) => {
            data.forEach((element) => {
              const p = document.createElement("p");
              p.textContent = element.amount;
              styleP(p, options);
              p.addEventListener("click", function () {
                handleOptionClick(p, parentDiv, options);
              });
            });
          });
        break;
      case "calendar":
        $("#datepicker").datepicker();
        $(parentDiv).click(function () {
          $("#datepicker").datepicker("show");
        });
        break;
      default:
        console.log("Unknown container clicked.");
    }

    const arrow = parentDiv.querySelector(".options-arrow");

    if (options) {
      if (options.style.display === "none") {
        arrow.style.transform = "rotate(180deg)";
        options.style.display = "block";
      } else {
        arrow.style.transform = "rotate(0deg)";
        options.style.display = "none";
      }
    }
  });
});

function styleP(p, div) {
  p.style.padding = "10px 0";
  p.style.borderTop = "1px solid rgba(66, 66, 68, 0.60)";
  p.style.color = "black";
  div.appendChild(p);
}

function handleOptionClick(p, parentDiv, options) {
  const mainParagraph = parentDiv.querySelector("h3");
  const arrow = parentDiv.querySelector(".options-arrow");

  if (mainParagraph) {
    mainParagraph.textContent = p.textContent;
  }
  options.style.display = "none";
  arrow.style.transform = "rotate(0deg)";
}
