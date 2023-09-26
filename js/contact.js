let nameBox = document.getElementById("nameField");
const email = document.getElementById("email");
const subjectBox = document.getElementById("subject");
const message = document.getElementById("message");
const form = document.getElementById("form");
const errorElement = document.getElementById("error");

form.addEventListener("submit", (e) => {
  let messages = [];

  if (nameBox.value === "" || nameBox.value == null) {
    messages.push("A name is required with more than 5 characters long");
  }
  if (email.value === "" || email.value == null) {
    messages.push(
      "An email address is required. Please include the symbol '@'"
    );
  }
  if (subjectBox.value === "" || subjectBox.value == null) {
    messages.push("Please provide a subject");
  }
  if (message.value === "" || message.value == null) {
    messages.push("A message is required");
  }

  if (nameBox.value.length < 5) {
    messages.push("Full name must exceed 5 characters");
  }

  if (message.value.length <= 12) {
    messages.push("Message must be of 12 or more characters");
  }

  if (message.value.length >= 100) {
    messages.push("Message must be less than 100 or more characters");
  }

  if (subjectBox.value.length <= 6) {
    messages.push("Subject must be of 12 or more characters");
  }

  if (messages.length > 0) {
    e.preventDefault(); //prevents page reload
    errorElement.innerText = messages.join(" ...  "); //all error messages joined, each separated by a comma
  }
});
