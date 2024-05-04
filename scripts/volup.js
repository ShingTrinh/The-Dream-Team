fetch('/events')
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('Failed to fetch events.');
    })
    .then(data => {
        console.log(data);
        displayEvents(data);
        // Do something with the data, such as displaying it on the page
    })
    .catch(error => {
        console.error('Error fetching events:', error);
        // Handle errors, such as displaying an error message to the user
    });

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
      
function createEventBlock(event) {
    const eventBlock = document.createElement('div');
    eventBlock.classList.add('event');
      
    eventBlock.innerHTML = `
    <h3>${event.title}</h3>
    <p>${event.description}</p>
    <p>Date: ${event.date.substring(0,10)}</p>
    <p>Time: ${event.time}</p>
    <p>Categories: ${[event.categories]}</p>
    <button>Join</button>
  `
          
    return eventBlock;
}


      
