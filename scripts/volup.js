function fetchEvents() {
  fetch('/getEvents')
      .then(function(response) {
          return response.json();
      })
      .then(function(events) {
          displayEvents(events);
      })
      .catch(function(error) {
          console.error('Error fetching events:', error);
      });
}

function displayEvents(events) {
  var eventContainer = document.getElementById('eventContainer');

  eventContainer.innerHTML = ''; 

  if (events.length === 0) {
      eventContainer.innerHTML = '<p>No events found</p>';
  } else {
      events.forEach(function(event) {
          var eventBlock = createEventBlock(event);
          eventContainer.appendChild(eventBlock);
      });
  }
}
