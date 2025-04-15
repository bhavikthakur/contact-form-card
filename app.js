// Select all elements
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

// Handle icons
generalQuery.addEventListener("change", () => {
  generalQuery.classList.add("hidden");
  generalQuerySelected.classList.remove("hidden");
  supportQuery.classList.remove("hidden");
  supportQuerySelected.classList.add("hidden");
});
supportQuery.addEventListener("change", () => {
  supportQuery.classList.add("hidden");
  supportQuerySelected.classList.remove("hidden");
  generalQuery.classList.remove("hidden");
  generalQuerySelected.classList.add("hidden");
});

consentCheck.addEventListener("change", () => {
  consentCheck.classList.toggle("hidden");
  consentSelected.classList.toggle("hidden");
});
consentSelected.addEventListener("click", () => {
  consentCheck.checked = false;
  consentSelected.classList.add("hidden");
  consentCheck.classList.remove("hidden");
});

// Form submission handler
form.addEventListener("submit", (e) => {
  e.preventDefault();
  let isValid = true;

  // Reset all errors and outlines
  resetErrors();

  // Validate each field
  if (!firstName.value.trim()) {
    showError(firstNameError, firstName);
    if (isValid) {
      firstName.focus();
    }
    isValid = false;
  }

  if (!lastName.value.trim()) {
    showError(lastNameError, lastName);
    if (isValid) {
      lastName.focus();
    }
    isValid = false;
  }

  if (!isValidEmail(email.value)) {
    showError(emailError, email);
    if (isValid) {
      email.focus();
    }
    isValid = false;
  }

  if (!generalQuery.checked && !supportQuery.checked) {
    queryError.classList.remove("hidden");
    if (isValid) {
      generalQuery.focus();
    }
    isValid = false;
  }

  if (!messageInput.value.trim()) {
    showError(messgageError, messageInput);
    if (isValid) {
      messageInput.focus();
    }
    isValid = false;
  }

  if (!consentCheck.checked) {
    consentError.classList.remove("hidden");
    if (isValid) {
      consentCheck.focus();
    }
    isValid = false;
  }

  // If all valid, show success
  if (isValid) {
    showSuccess();
  }
});

// Helper function to show error
function showError(errorElement, inputElement) {
  errorElement.classList.remove("hidden");
  inputElement.classList.add("outline__error");
}

// Helper function to reset all errors
function resetErrors() {
  allErrors.forEach((error) => error.classList.add("hidden"));
  allInputs.forEach((input) => input.classList.remove("outline__error"));
  textarea.classList.remove("outline__error");
}

// Helper function to validate email
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Function to show success message and handle timeout
function showSuccess() {
  success.classList.add("submit");

  // Reset all form fields
  form.reset();

  // Wait for DOM to update, then sync visual icons with new state
  requestAnimationFrame(() => {
    // Reset custom icon visibility
    generalQuery.classList.remove("hidden");
    supportQuery.classList.remove("hidden");
    consentCheck.classList.remove("hidden");

    generalQuerySelected.classList.add("hidden");
    supportQuerySelected.classList.add("hidden");
    consentSelected.classList.add("hidden");

    // Double-check all inputs are also unchecked
    generalQuery.checked = false;
    supportQuery.checked = false;
    consentCheck.checked = false;
  });

  // Show success message and set up auto-hide
  const timeoutId = setTimeout(() => {
    success.classList.remove("submit");
  }, 5000);

  const hideMessageImmediately = () => {
    success.classList.remove("submit");
    clearTimeout(timeoutId);
    document.removeEventListener("mousedown", hideMessageImmediately);
    document.removeEventListener("keydown", hideMessageImmediately);
  };

  document.addEventListener("mousedown", hideMessageImmediately);
  document.addEventListener("keydown", hideMessageImmediately);
}

// Real-time validation as user types
firstName.addEventListener("input", () => {
  if (firstNameError.classList.contains("hidden")) return;
  firstNameError.classList.add("hidden");
  firstName.classList.remove("outline__error");
});

lastName.addEventListener("input", () => {
  if (lastNameError.classList.contains("hidden")) return;
  lastNameError.classList.add("hidden");
  lastName.classList.remove("outline__error");
});

email.addEventListener("input", () => {
  if (emailError.classList.contains("hidden")) return;
  emailError.classList.add("hidden");
  email.classList.remove("outline__error");
});

messageInput.addEventListener("input", () => {
  if (messgageError.classList.contains("hidden")) return;
  messgageError.classList.add("hidden");
  messageInput.classList.remove("outline__error");
});
