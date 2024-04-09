const searchButton = document.querySelector(".search-button");
const optionsSection = document.querySelector(".options-section");
const moreOptions = document.querySelector(".more-options");
const mainSection = document.querySelector(".main-section");
const swiperSection = document.querySelector(".first-swiper");
const selectionInfo = document.querySelector(".selection-info");
const startingCity = document.querySelector("#from h3");
const destinationCity = document.querySelector("#to h3");
const optionsStartingCity = document.querySelector(".from p");
const optionsDestinationCity = document.querySelector(".to p");
const fligthsSection = document.querySelector(".flights-container");
const showMoreButton = document.querySelector(".show-more-button");
const body = document.querySelector("body");

let datePicked;
datePicked = document.getElementById("datepicker").value;
let clicked = false;

searchButton.addEventListener("click", () => {
  selectionInfo.innerHTML = "";
  datePicked = document.getElementById("datepicker").value;

  if (datePicked && !clicked) {
    clicked = true;

    const infoCities = document.createElement("div");
    infoCities.classList.add("selection-info-cities");

    const cities = document.createElement("p");
    cities.textContent = `${startingCity.textContent} - ${destinationCity.textContent}`;

    optionsStartingCity.textContent = `Take off - ${startingCity.textContent}`;
    optionsStartingCity.style.marginTop = "0.5em";
    optionsDestinationCity.textContent = `Take off - ${destinationCity.textContent}`;
    optionsDestinationCity.style.marginTop = "0.5em";

    const editButton = document.createElement("img");
    editButton.src = "../images/edit.svg";

    infoCities.appendChild(cities);
    infoCities.appendChild(editButton);

    selectionInfo.appendChild(infoCities);

    const infoDetails = document.createElement("div");
    infoDetails.classList.add("selection-info-details");

    const details = document.createElement("p");
    details.textContent = datePicked;
    details.style.paddingTop = "0.3em";

    infoDetails.appendChild(details);
    selectionInfo.appendChild(infoDetails);

    if (window.innerWidth < 1025) {
      editButton.addEventListener("click", () => {
        optionsSection.style.display = "flex";
        moreOptions.style.display = "flex";
        mainSection.style.display = "none";
        selectionInfo.style.display = "none";
        cities.textContent = "";
        editButton.src = "";
        details.textContent = "";
        fligthsSection.innerHTML = "";
      });

      optionsSection.style.display = "none";
      moreOptions.style.display = "none";
      mainSection.style.display = "flex";
      selectionInfo.style.display = "block";

      createDivs(fligthsSection, 5);
    } else {
      createDivs(fligthsSection, 8);
      mainSection.style.display = "flex";
      selectionInfo.style.display = "none";
    }

    body.style.height = "100%";
  }
});

function createDivs(parentElement, numberOfDivs) {
  fetch("../json/service-cards.json")
    .then((response) => response.json())
    .then((data) => {
      for (let i = 0; i < numberOfDivs; i++) {
        const div = document.createElement("div");
        div.classList.add("flight-container");
        div.style.backgroundColor = "white";

        const airlinesContainer = document.createElement("div");
        airlinesContainer.classList.add("airlines-container");

        const airlinesDiv = document.createElement("div");
        airlinesDiv.classList.add("airlines-div");
        const airlinesImg = document.createElement("img");
        const airlinesName = document.createElement("p");

        airlinesImg.src = data.airlinesImgSrc;
        airlinesName.textContent = data.airlinesName;

        airlinesDiv.appendChild(airlinesImg);
        airlinesDiv.appendChild(airlinesName);

        airlinesContainer.appendChild(airlinesDiv);

        const flightInfo = document.createElement("div");
        flightInfo.classList.add("flight-info");

        const flightInfoLanding = document.createElement("div");
        flightInfoLanding.classList.add("flight-info-landing");
        const takeOff = document.createElement("p");
        takeOff.textContent = "Take off";
        const landingP = document.createElement("p");
        landingP.textContent = "Landing";

        flightInfoLanding.appendChild(takeOff);
        flightInfoLanding.appendChild(landingP);
        flightInfo.appendChild(flightInfoLanding);

        const flightInfoTime = document.createElement("div");
        flightInfoTime.classList.add("flight-info-time");
        const takeOffTime = document.createElement("p");
        takeOffTime.textContent = data.takeOffTime;
        const roadLine = document.createElement("div");
        roadLine.classList.add("road-line");
        const rectangle = document.createElement("div");
        rectangle.classList.add("rectangle");
        const randomLeft = 35 + Math.random() * 30;
        rectangle.style.left = `${randomLeft}%`;
        const line = document.createElement("hr");
        const landingTime = document.createElement("p");
        landingTime.textContent = data.landingTime;

        roadLine.appendChild(rectangle);
        roadLine.appendChild(line);

        flightInfoTime.appendChild(takeOffTime);
        flightInfoTime.appendChild(roadLine);
        flightInfoTime.appendChild(landingTime);
        flightInfo.appendChild(flightInfoTime);

        airlinesContainer.appendChild(flightInfo);

        const timeLeftP = document.createElement("p");
        timeLeftP.textContent = data.timeDuration;
        timeLeftP.classList.add("opacity");
        timeLeftP.classList.add("time-left");

        airlinesContainer.appendChild(timeLeftP);

        div.appendChild(airlinesContainer);

        const viewDielContainer = document.createElement("div");
        viewDielContainer.classList.add("view-deal-container");
        const price = document.createElement("p");
        price.textContent = "Price: " + data.price;
        const viewDealButton = document.createElement("button");
        viewDealButton.classList.add("view-deal-button");
        viewDealButton.textContent = "View Deal";

        viewDielContainer.appendChild(price);
        viewDielContainer.appendChild(viewDealButton);

        div.appendChild(viewDielContainer);

        parentElement.appendChild(div);
      }
    })
    .catch((error) => console.error("Error fetching JSON:", error));
}

showMoreButton.addEventListener("click", () => {
  createDivs(fligthsSection, 5);
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

const dropDownArrow = document.querySelectorAll(".drop-down-arrow");

dropDownArrow.forEach((arrow) => {
  arrow.addEventListener("click", () => {
    const dropDown = arrow.parentElement.nextElementSibling;

    if (dropDown.style.display === "flex") {
      dropDown.style.display = "none";
      arrow.style.transform = "rotate(270deg)";
    } else {
      dropDown.style.display = "flex";
      arrow.style.transform = "rotate(90deg)";
    }
  });
});

window.addEventListener("resize", () => {
  if (window.innerWidth < 1025 && clicked) {
    filterAside.style.top = `55px`;
    filterAside.style.width = "0";
    optionsSection.style.display = "none";
    moreOptions.style.display = "none";
    selectionInfo.style.display = "block";
  } else if (window.innerWidth < 1025 && window.innerWidth >= 601) {
    optionsSection.style.display = "grid";
  } else if (window.innerWidth > 1025) {
    filterAside.style.top = "0";
    filterAside.style.display = "block";
    filterAside.style.width = "100%";
    filterAside.style.paddingTop = "32px";
    selectionInfo.style.display = "none";
    optionsSection.style.display = "flex";
    moreOptions.style.display = "flex";
  }
});

if (window.innerWidth < 1025) {
  filterAside.style.top = `55px`;
} else {
  filterAside.style.paddingTop = "32px";
}

document.querySelectorAll(".fromSlider").forEach(function (fromSlider) {
  const toSlider = document.getElementById(
    fromSlider.getAttribute("id").replace("from", "to")
  );
  toSlider.min = fromSlider.value;

  fromSlider.addEventListener("input", function () {
    if (parseInt(this.value) >= parseInt(toSlider.value)) {
      this.value = parseInt(toSlider.value);
    }
    if (parseInt(this.value) > parseInt(toSlider.value)) {
      toSlider.min = this.value;
    }
  });

  toSlider.addEventListener("input", function () {
    if (parseInt(this.value) <= parseInt(fromSlider.value)) {
      this.value = parseInt(fromSlider.value);
    }
  });
});
