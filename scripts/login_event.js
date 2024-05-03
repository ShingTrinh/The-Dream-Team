// Assign event listener to return button on login page.
const returnButton = document.getElementById("userReturn");
returnButton.addEventListener("click", returnClicked);

// Assign event listener to login button.
const loginButton = document.getElementById("userLogin");
loginButton.addEventListener("click", loginClicked);

// Assign listeners to radio buttons. 
var userRadios = document.forms["categories"].elements["userType"];
for (i = 0, count = userRadios.length; i < count; i++) {
    userRadios[i].addEventListener("click", radioClicked)
}

// Handle return button event.
function returnClicked() {
    // Display message for testing.
    console.log("Returning to home page.");
    window.location.replace("http://index.html"); // Redirect to home page.
}

// Handle login button event.
function loginClicked() {
    var userLoginInfo = {
        username: document.getElementById("usernameField").value,
        sacStateID: document.getElementById("passwordField").value,
    };

    if (isEmpty(userLoginInfo)) {
        alert("Please write in all fields");
    } else {
        validateUserInfo(userLoginInfo);
    }

}

/* function radioClicked() {
    


} */


// Check for empty fields. 
function isEmpty(userLoginInfo) {
    return ((userLoginInfo.username === "") || (userLoginInfo.sacStateID === ""));
}

/*// Validate entered info.
function validateUserInfo(userInfo) {




} */



