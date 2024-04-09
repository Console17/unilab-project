const hamburger = document.querySelector(".hamburger-logo");
const closeLogo = document.querySelector(".close-logo");
const userLogo = document.querySelector(".user-logo");
const nav = document.querySelector(".navigation-section");
const primaryMenu = document.querySelector(".primary-menu");
const headerDiv = document.querySelector(".header-div");

function handleScroll() {
  if (window.scrollY > 0) {
    headerDiv.classList.add("scrolled");
  } else {
    headerDiv.classList.remove("scrolled");
  }
}

window.addEventListener("scroll", handleScroll);

let isOpen = false;

hamburger.addEventListener("click", () => {
  nav.style.display = "block";
});

closeLogo.addEventListener("click", () => {
  nav.style.display = "none";
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 1025) {
    nav.style.display = "block";
    primaryMenu.style.display = "none";
  } else {
    nav.style.display = "none";
    primaryMenu.style.display = "flex";

    isOpen = false;
  }
});

manageNav = () => {
  if (isOpen) {
    primaryMenu.style.display = "none";
    isOpen = false;
  } else {
    primaryMenu.style.display = "flex";
    isOpen = true;
  }
};

userLogo.addEventListener("click", manageNav);

// if (window.innerHeight < 1000) {
//   document.body.style.height = "100%";
// } else {
//   document.body.style.height = "100vh";
// }

// window.addEventListener("resize", () => {
//   if (window.innerHeight < 1000) {
//     document.body.style.height = "100%";
//   } else {
//     document.body.style.height = "100vh";
//   }
// });
