// Declare constant variable 'b' to hold HTML target element.
const Submit = document.getElementById("SubmitButton");
Submit.addEventListener("click", SignUpClicked);

const Back = document.getElementById("backbtn");
Back.addEventListener("click",backClicked)

function backClicked(){
    console.log("BACK!");
    window.location.href = "../WelcomePage/index.html"
}


function registerUser(userData){
    fetch('/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    })
    .then(response => {
        if (response.ok) {
            // Redirect user to the next page upon successful signup
            console.log("SUCCESS!");
        } else {
            throw new Error('Network response was not ok');
        }
    })
    .catch(error => {
        console.error('Error during signup:', error);
        alert('An error occurred during signup. Please try again later.');
    });
}


// Function for reading user input after button is clicked.
function SignUpClicked() {  
    console.log("IN SIGNUPCLICK");
    var userData = {
        firstName:document.getElementById("adjustTextbox").value,
        lastName:document.getElementById("adjustTextbox2").value,
        email:document.getElementById("adjustTextbox3").value,
        studentID:document.getElementById("adjustTextbox4").value,
        password:document.getElementById("adjustTextbox5").value
    };
    if (isEmpty(userData)) {
        alert("Please fill in all fields.");
    } else {
        registerUser(userData);
    }
}

// Check for empty string input.
function isEmpty(userData) {
    return ((userData.firstName === "") || (userData.lastName === "") || (userData.email === "") || (userData.studentID === "") || (userData.password === ""));
}







