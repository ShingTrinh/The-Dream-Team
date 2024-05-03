// Declare constant variable 'b' to hold HTML target element.
const Submit = document.getElementById("SubmitButton");
Submit.addEventListener("click", SignUpClicked);

const Back = document.getElementById("backbtn");
Back.addEventListener("click", backClicked);

function backClicked() {
    console.log("BACK!");
    window.location.href = "../WelcomePage/index.html";
    console.log('JSON stringified userData:', JSON.stringify(userData));

}

function registerUser(userData) {
    console.log('JSON stringified userData:', JSON.stringify(userData));
    
    fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    })
    .then(response => {
        if (response.ok) {
            // Event creation successful
            console.log("Registration successful!");
            // Redirect user to login page or dashboard
            window.alert('Registration success!');
            window.location.href = "./volup.html";
        } else {
            // Registration failed
            console.error('Error during signup:', response.statusText);
            alert('Registration failed. Please try again.');
        }
    })
    .catch(error => {
        console.error('Error during signup:', error);
        alert('An error occurred during signup. Please try again later.');
    });

}

// Function for reading user input after button is clicked.
function SignUpClicked() {  
    var userData = {
        //these need to be the same variable names as the one in the register controller
        fname: document.getElementById("adjustTextbox").value,
        lname: document.getElementById("adjustTextbox2").value,
        email: document.getElementById("adjustTextbox3").value,
        stuid: document.getElementById("adjustTextbox4").value,
        pwd: document.getElementById("adjustTextbox5").value
    };
        registerUser(userData);
}

// Check for empty string input.
function isEmpty(userData) {
    return (
        userData.firstName === "" ||
        userData.lastName === "" ||
        userData.email === "" ||
        userData.studentID === "" ||
        userData.password === ""
    );
}
