const form = document.querySelector(".form");
const success = document.querySelector(".header");
const firstName = document.querySelector("#firstname");
const lastName = document.querySelector("#lastname");
const email = document.querySelector("#email");
const generalQuery = document.querySelector("#general");
const supportQuery = document.querySelector("#support");
const messageInput = document.querySelector("#message");
const consentCheck = document.querySelector("#consent");
const firstNameError = document.querySelector(".container__error--firstname");
const lastNameError = document.querySelector(".container__error--lastname");
const emailError = document.querySelector(".container__error--email");
const queryError = document.querySelector(".container__error--query");
const messgageError = document.querySelector(".container__error--message");
const consentError = document.querySelector(".container__error--consent");
const generalQuerySelected = document.querySelector(
  ".query__selected--general"
);
const supportQuerySelected = document.querySelector(
  ".query__selected--support"
);
const consentSelected = document.querySelector(".consent__selected");
const allErrors = document.querySelectorAll(".container__error");
const allInputs = document.querySelectorAll("input");
const textarea = document.querySelector("textarea");

generalQuery.addEventListener("click", () => {
  generalQuery.classList.add("hidden");
  generalQuerySelected.classList.remove("hidden");
  supportQuerySelected.classList.add("hidden");
  supportQuery.classList.remove("hidden");
});
supportQuery.addEventListener("click", () => {
  supportQuery.classList.add("hidden");
  supportQuerySelected.classList.remove("hidden");
  generalQuery.classList.remove("hidden");
  generalQuerySelected.classList.add("hidden");
});
consentCheck.addEventListener("click", () => {
  consentCheck.classList.add("hidden");
  consentSelected.classList.remove("hidden");
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (firstName.value) {
    if (lastName.value) {
      if (email.value.includes("@")) {
        if (generalQuery.checked || supportQuery.checked) {
          if (messageInput.value) {
            if (consentCheck.checked) {
              success.classList.add("submit");
              allErrors.forEach((error) => {
                error.classList.add("hidden");
              });
              allInputs.forEach((input) => {
                input.classList.remove("outline__error");
                input.value = "";
                input.checked = false;
              });
              textarea.classList.remove("outline__error");
              textarea.value = "";
              generalQuery.classList.remove("hidden");
              supportQuery.classList.remove("hidden");
              generalQuerySelected.classList.add("hidden");
              supportQuerySelected.classList.add("hidden");
              consentCheck.classList.remove("hidden");
              consentSelected.classList.add("hidden");
            } else {
              consentError.classList.remove("hidden");
            }
          } else {
            messgageError.classList.remove("hidden");
            messageInput.classList.add("outline__error");
          }
        } else {
          queryError.classList.remove("hidden");
        }
      } else {
        emailError.classList.remove("hidden");
        email.classList.add("outline__error");
      }
    } else {
      lastNameError.classList.remove("hidden");
      lastName.classList.add("outline__error");
    }
  } else {
    firstNameError.classList.remove("hidden");
    firstName.classList.add("outline__error");
  }
});
