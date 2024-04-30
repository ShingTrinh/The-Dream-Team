// Declare constant variable 'b' to hold HTML target element.
const b = document.getElementById("SubmitButton");
b.addEventListener("click", loginClicked);

// Function for reading user input after button is clicked.
function loginClicked() {  
    var firstName = document.getElementById("adjustTextbox").value;
    var lastName = document.getElementById("adjustTextbox2").value;
    var email = document.getElementById("adjustTextbox3").value;
    var password = document.getElementById("adjustTextbox4").value;

    if ((isEmpty(firstName, lastName, email, password))) {
        alert("Invalid credentials.");
    }  else {
        
        console.log("Hello");//window.location = next page;
    } 

 /* console.log("First name: ", firstName);
    console.log("Last name: ", lastName);
    console.log("Email: ", email);
    console.log("Password: ", password); */

}

// Check for empty strings.
function isEmpty(firstName, lastName, email, password) {
    return ((firstName === "") || (lastName === "") || (email === "") || (password === ""));
}




