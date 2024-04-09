const spans = document.querySelectorAll(".terms-condition span");
const modal = document.querySelector(".terms-condition-modal");
const modalButton = document.querySelector(".modal-button");
const authorizationButton = document.querySelector(".authorization-button");
const form = document.querySelector("form");
const inputs = form.querySelectorAll(
  'input[type="text"], input[type="password"]'
);

spans.forEach((span) => {
  span.addEventListener("click", () => {
    modal.style.display = "flex";
    document.body.style.overflow = "hidden";
  });
});

modalButton.addEventListener("click", () => {
  modal.style.display = "none";
  document.body.style.overflow = "auto";
});

function checkForm() {
  let isValid = true;
  let passwordsMatch = true;

  inputs.forEach((input) => {
    if (input.value === "") {
      isValid = false;
    }
  });

  const password = form.querySelector("#password").value;
  const confirmPasswordField = form.querySelector("#confirm-password");
  const confirmPassword = confirmPasswordField
    ? confirmPasswordField.value
    : null;
  if (confirmPasswordField && password !== confirmPassword) {
    passwordsMatch = false;
  }

  if (isValid && passwordsMatch) {
    authorizationButton.disabled = false;
  } else {
    authorizationButton.disabled = true;
  }
}

inputs.forEach((input) => {
  input.addEventListener("input", () => {
    checkForm();
  });
});

authorizationButton.addEventListener("click", (e) => {
  e.preventDefault();
  checkForm();
  if (!authorizationButton.disabled) {
    window.location.href = "../pages/index.html";
  }
});

if (window.innerHeight < 1000) {
  document.body.style.height = "100%";
} else {
  document.body.style.height = "100vh";
}

window.addEventListener("resize", () => {
  if (window.innerHeight < 1000) {
    document.body.style.height = "100%";
  } else {
    document.body.style.height = "100vh";
  }
});

document.addEventListener("DOMContentLoaded", () => {
  inputs.forEach((input) => {
    // input.addEventListener("focus", () => {
    //   const validationP = input.nextElementSibling;
    //   if (input.value.trim() === "") {
    //     validationP.style.visibility = "visible";
    //   }
    // });
    input.addEventListener("blur", () => {
      const validationP = input.nextElementSibling;
      if (input.value.trim() === "") {
        validationP.style.visibility = "visible";
      }
    });
    input.addEventListener("input", () => {
      const validationP = input.nextElementSibling;
      if (input.value.trim() === "") {
        validationP.style.visibility = "visible";
      } else {
        validationP.style.visibility = "hidden";
      }
    });
  });
});
