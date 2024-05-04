const Submit = document.getElementById("submitBtn");
Submit.addEventListener("click", SubmitClicked);

const exit = document.getElementById("xbtn");
exit.addEventListener("click", exitClicked);

function exitClicked(){
    window.location.href = "../WelcomePage/index.html";
}

function SubmitClicked(){
    console.log("SUBMITTED!");
    //window.location.href = "../views/adminEvent.html";

    var eventData = {
        //these need to be the same variable names as the one in the register controller
        title: document.getElementById("eventName").value,
        description: document.getElementById("eventDescription").value,
        date: document.getElementById("eventDate").value,
        time: document.getElementById("eventTime").value,
        categories: document.getElementById("eventCategories").value
    };
    createEvent(eventData)
}

function createEvent(eventData){
    console.log('JSON stringified userData:', JSON.stringify(eventData));

    fetch('/events', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData),
    })
    .then(response => {
        if (response.ok) {
            // Creation successful
            console.log("Event Created!");
            // Redirect admin back to Event Page
            window.alert('Event Successfully Created!');
            window.location.href = "./adminEvent.html";
        } else {
            // event creation failed
            console.error('Error during creation:', response.statusText);
            alert('Creation failed. Please try again.');
        }
    })
    .catch(error => {
        console.error('Error during creation:', error);
        alert('An error occurred during creating. Please try again later.');
    });
}
