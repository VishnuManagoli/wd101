const minDob = new Date("1967-11-09");
document
  .getElementById("registrationForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    if (validateForm()) {
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const dobInput = document.getElementById("dob").value;
      const password = document.getElementById("password").value;
      const terms = document.getElementById("terms").checked;

      const dob = new Date(dobInput);
      displayInfo(name, email, dob.toISOString().slice(0, 10), password, terms);
    }
  });

function validateForm() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const dobInput = document.getElementById("dob").value;
  const password = document.getElementById("password").value;
  const terms = document.getElementById("terms").checked;

  const dob = new Date(dobInput);
  if (!name || !email || !dobInput || !password || !terms) {
    alert("Please fill all fields and accept the terms and conditions.");
    return false;
  }

  if (dob < minDob) {
    alert("Date of Birth must be after 9/11/1967.");
    return false;
  }

  return true;
}

function displayInfo(name, email, dob, password, terms) {
  const tableBody = document.querySelector("#data-table tbody");
  const row = document.createElement("tr");

  row.innerHTML = `
        <td>${name}</td>
        <td>${email}</td>
        <td>${password}</td> <!-- Masking the password -->
        <td>${dob}</td>
        <td>${
          terms ? "True" : "False"
        }</td> <!-- Display true/false for accepted terms -->
    `;

  tableBody.appendChild(row); // Add the new row to the table
}
