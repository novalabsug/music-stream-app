const signinForm = document.querySelector("form#signin-form");
const signUpForm = document.querySelector("form#signup-form");
const HandleRequests = new HandleHttpRequests();

signUpForm.addEventListener("submit", (e) => {
  e.preventDefault();
  HandleRequests.handleUserSignup(signUpForm);
});

signinForm.addEventListener("submit", (e) => {
  e.preventDefault();
  HandleRequests.handleUserSignin(signinForm);
});
