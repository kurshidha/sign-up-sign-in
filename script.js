const title = document.getElementById("title");
const toggle = document.getElementById("toggle");
const form = document.getElementById("form");
const msg = document.getElementById("msg");

const username = document.getElementById("username");
const email = document.getElementById("email");
const newpassword = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");

let isSignup = true;

/*  Signup / Signin */
toggle.addEventListener("click", () => {
  isSignup = !isSignup;

  title.textContent = isSignup ? "Sign Up" : "Sign In";
  toggle.textContent = isSignup ? "Sign In" : "Sign Up";

  username.style.display = isSignup ? "block" : "none";
  confirmPassword.style.display = isSignup ? "block" : "none";

  msg.textContent = "";
});


/* Submit */
form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (isSignup) {
    signup();
  } else {
    signin();
  }
});

/* Signup Function */
function signup() {
  if (
    username.value === "" ||
    email.value === "" ||
    password.value === "" ||
    confirmPassword.value === ""
  ) {
    showMsg("All fields are required", "red");
    return;
  }

  if (password.value !== confirmPassword.value) {
    showMsg("Passwords do not match", "red");
    return;
  }

  const user = {
    username: username.value,
    email: email.value,
    password: password.value
 }; 
 localStorage.setItem("userData", JSON.stringify(user));

  showMsg("Signup successful! Please Sign In", "green");
  form.reset();
}

/* Signin Function */
function signin() {
  const storedUser = JSON.parse(localStorage.getItem("userData"));

  if (!storedUser) {
    showMsg("No user found. Please Sign Up", "red");
    return;
  }

  
  if (
    email.value === storedUser.email &&
    password.value === storedUser.password
  ) {
    showMsg("Login successful!", "green");
  } else {
    showMsg("Invalid email or password", "red");
  }
}

/* Message Function */
function showMsg(text, color) {
  msg.textContent = text;
  msg.style.color = color;
}

