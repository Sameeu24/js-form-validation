const registerBtn = document.querySelector('#registerBtn');
const firstName = document.querySelector('#first-name');
const lastName = document.querySelector('#last-name');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const confirmPassword = document.querySelector('#confirm-password');
let isFormValid = true;

// Function to create an HTML element with a tag name and text content
const createElement = (tag, text) => {
  const elem = document.createElement(tag);
  elem.textContent = text;
  return elem;
};

// Validation function for different types of input
const validationFn = (event) => {
  const type = event.target.type;
  let isValid = false;
  switch (type) {
    case 'text':
      isValid = isAlphabet(event.target.value);
      break;
    case 'email':
      isValid = isEmail(event.target.value);
      break;
    case 'date':
      isValid = isFutureDate(event.target.value);
      break;
    case 'password':
      // Handle password and confirm password fields separately
      isValid = validatePassword();
      break;
  }
  if (!isValid) {
    isFormValid = false;
    event.target.style.border = '2px solid red';
    const span = createElement('span', getErrorMessage(event.target));
    span.style.color = 'red';
    if (!event.target.parentNode.querySelector('span')) {
      event.target.parentNode.appendChild(span);
    }
  } else {
    event.target.style.border = '2px solid green';
    const errorSpan = event.target.parentNode.querySelector('span');
    if (errorSpan) {
      errorSpan.remove();
    }
  }
};

// Function to validate both password and confirm password fields
const validatePassword = () => {
  if (password.value !== confirmPassword.value) {
    return false;
  }
  return true;
};

// Function to return the appropriate error message
const getErrorMessage = (input) => {
  switch (input.id) {
    case 'first-name':
      return 'First name should contain only alphabets';
    case 'email':
      return 'Invalid email address';
    case 'password':
      return 'Passwords do not match';
    default:
      return '';
  }
};

// Adding event listeners to the input fields
firstName.addEventListener('focusout', validationFn);
lastName.addEventListener('focusout', validationFn);
email.addEventListener('focusout', validationFn);
password.addEventListener('focusout', validationFn);
confirmPassword.addEventListener('focusout', validationFn);

// Function to handle form registration
const registerForm = (event) => {
  console.log('register');
  console.log(event);
};
registerBtn.addEventListener('click', registerForm);

// Function to check if a string contains only alphabets
const isAlphabet = (str) => /^[a-zA-Z]+$/.test(str);

// Function to check if a string is a valid email
const isEmail = (str) => /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(str);

// Function to check if a date is in the future
const isFutureDate = (date) => new Date(date) > new Date();
