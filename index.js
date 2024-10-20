let userForm = document.getElementById('user-form');

const retrieveEntries = () =>{
    let entries =  localStorage.getItem("user-entries");
    if(entries){
        entries = JSON.parse(entries);
    }else{
        entries = []
    }
    return entries;
}
let userEntries = retrieveEntries();

const displayEntries = () => {
    const entries = retrieveEntries(); 

    const tableEntries = entries.map((entry) => {
        const nameCell = `<td class="border px-4 py-2">${entry.name}</td>`;
        const emailCell = `<td class="border px-4 py-2">${entry.email}</td>`;
        const passwordCell = `<td class="border px-4 py-2">${entry.password}</td>`;
        const dobCell = `<td class="border px-4 py-2">${entry.dob}</td>`;
        const acceptTermsCell = `<td class="border px-4 py-2">${entry.acceptTermsAndConditions}</td>`;

        const row = `<tr>${nameCell} ${emailCell} ${passwordCell} ${dobCell} ${acceptTermsCell}</tr>`;
        return row;
    }).join("\n");

        const table = `<table class="table-auto w-full"><tr>

        <th class="px-4 py-2">Name</th>
        <th class="px-4 py-2">Email</th>
        <th class="px-4 py-2">Password</th>
        <th class="px-4 py-2">dob</th>
        <th class="px-4 py-2">accepted terms?</th>
    </tr>${tableEntries} </table>`;

let details = document.getElementById("user-entries");
details.innerHTML = table;

}

// Function to set the min and max attributes for the date input
function setDOBRange() {
    const today = new Date();
    const minDate = new Date(today.getFullYear() - 55, today.getMonth(), today.getDate() + 1);
    const maxDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());

    // Set the min and max attributes of the date input field
    document.getElementById('dob').setAttribute('min', minDate.toISOString().split('T')[0]);
    document.getElementById('dob').setAttribute('max', maxDate.toISOString().split('T')[0]);
}

// Function to validate the date of birth when the user changes it
function validateDOB() {
    const dobInput = document.getElementById('dob');
        //const errorMessage = document.getElementById('error-message');
        const dob = new Date(dobInput.value);
        
        if (dob < minDate || dob > maxDate) {
            errorMessage.style.display = 'block'; // Show error message
        } else {
            errorMessage.style.display = 'none'; // Hide error message
        }
}

// Set the date range when the page loads
window.onload = setDOBRange;


const saveUserForm = (event) => {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const dob = document.getElementById("dob").value;

    const acceptTermsAndConditions = document.getElementById("acceptTerms").checked;

    const entry = {
        name,
        email,
        password,
        dob,
        acceptTermsAndConditions
    };
    
    userEntries.push(entry);

    localStorage.setItem("user-entries",JSON.stringify(userEntries));
    displayEntries();
    setDOBRange();
    localStorage.clear();

}
userForm.addEventListener("submit", saveUserForm);
displayEntries();
setDOBRange();
localStorage.clear();

