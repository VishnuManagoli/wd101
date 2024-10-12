const minDob = new Date('1967-11-09'); 
const maxDob = new Date(new Date().setFullYear(new Date().getFullYear() - 55)); 

window.onload = function() {
    const storedData = JSON.parse(localStorage.getItem('registrationData')) || [];
    storedData.forEach(entry => {
        displayInfo(entry.name, entry.email, entry.dob, entry.password, entry.terms);
    });
}

document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault(); 
    if (validateForm()) {
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const dobInput = document.getElementById('dob').value;
        const password = document.getElementById('password').value;
        const terms = document.getElementById('terms').checked;

        displayInfo(name, email, dobInput, password, terms);
        storeData(name, email, dobInput, password, terms); 
        clearForm(); 
    }
});

function validateForm() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const dobInput = document.getElementById('dob').value;
    const password = document.getElementById('password').value;
    const terms = document.getElementById('terms').checked;

    const dob = new Date(dobInput);
    const age = new Date().getFullYear() - dob.getFullYear();

    if (!name || !email || !dobInput || !password || !terms) {
        alert("Please fill all fields and accept the terms and conditions.");
        return false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert("Please enter a valid email address.");
        return false; 
    }

    if (age < 18 || age > 55) {
        alert("You must be between 18 and 55 years old.");
        return false; 
    }

    return true;
}

// Display submitted data in the table
function displayInfo(name, email, dob, password, terms) {
    const tableBody = document.querySelector("#data-table tbody");
    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${name}</td>
        <td>${email}</td>
        <td>${password}</td> 
        <td>${dob}</td>
        <td>${terms ? 'True' : 'False'}</td>
    `;

    tableBody.appendChild(row); 
}

function storeData(name, email, dob, password, terms) {
    const storedData = JSON.parse(localStorage.getItem('registrationData')) || [];
    storedData.push({ name, email, dob, password, terms });
    localStorage.setItem('registrationData', JSON.stringify(storedData)); 
}

function clearForm() {
    document.getElementById('registrationForm').reset();
}
