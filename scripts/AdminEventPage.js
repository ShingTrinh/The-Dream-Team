const createEventBtn = document.getElementById('createEvent');
const signOutBtn = document.getElementById('signOut');

const myPopup = document.getElementById('Popup');

createEventBtn.addEventListener('click',createEvent);
signOutBtn.addEventListener('click', signOut);

function createEvent() {
  console.log("CREATE!");
  window.location.href = "../views/createEvent2.html";
}

function signOut() {
  console.log("SIGNOUT!");
  window.location.href = "../views/hh_login_page.html";
}
getAllEvents();

function getAllEvents(){
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

function createEventBlock(event) {
  const eventBlock = document.createElement('div');
  eventBlock.classList.add('event');

  eventBlock.innerHTML = `
    <h3>${event.title}</h3>
    <p>${event.description}</p>
    <p>Date: ${event.date.substring(0,10)}</p>
    <p>Time: ${event.time}</p>
    <p>Categories: ${[event.categories]}</p>
    
    <button class="open-modal-btn" data-modal-target="#modal">Edit</button>
    <div class="modal" id="modal">
    <div class="modal-header">
    <div class="title">Example Modal</div>
    <button data-close-button class="close-button">&times;</button>
    </div>
    <div class="modal-body"></div>`;

  const openModalButton = eventBlock.querySelector('.open-modal-btn');
  openModalButton.addEventListener('click', () => {
    showEditForm(event);
});

  const closeButton = eventBlock.querySelector('[data-close-button]');
  closeButton.addEventListener('click', () => {
    const modal = closeButton.closest('.modal');
    closeModal(modal);
  });
   
   return eventBlock;
}

function showEditForm(event) {
  const modal = document.querySelector('#modal');
  const modalTitle = modal.querySelector('.title');
  const modalBody = modal.querySelector('.modal-body');

  modalTitle.textContent = "Event ID: " + event._id;

  modalBody.innerHTML = `
    <label for="title">Title</label>
    <input type="text" id="titleInput" value="${event.title}" ><br>
    <label for="descriptionInput">Description</label><br>
    <textarea id="descriptionInput" rows="4" cols="50">${event.description}</textarea><br>
    <label for="dateInput">Date</label>
    <input type="date" id="dateInput" value="${event.date.substring(0,10)}"><br>
    <label for="timeInput">Time</label>
    <input type="time" id="timeInput" value="${event.time}"><br>
    <label for="categoriesInput">Categories</label>
    <input type="text" id="categoriesInput" value="${event.categories}"><br>
    <button id="saveChangesBtn">Save Changes</button>
    `;

  openModal(modal);

  const titleInput = document.getElementById('titleInput');
  const descriptionInput = document.getElementById('descriptionInput');
  const dateInput = document.getElementById('dateInput');
  const timeInput = document.getElementById('timeInput');
  const categoriesInput = document.getElementById('categoriesInput');

  const saveChangesBtn = modalBody.querySelector('#saveChangesBtn');
  saveChangesBtn.addEventListener('click', () => {
    event.title = titleInput.value;
    event.description = descriptionInput.value;
    event.date = dateInput.value;
    event.time = timeInput.value;
    event.categories = categoriesInput.value;

    console.log('title after save changes ' + event.title)
    console.log('title after save changes ' + event.description)
    console.log('title after save changes ' + event.date)
    console.log('title after save changes ' + event.time)
    console.log('title after save changes ' + event.categories)

      // Send updated event data to server
    saveChangesToDatabase(event);

  });
  
}

async function saveChangesToDatabase(event) {
  try {
      const response = await fetch(`/events/${event._id}`, { 
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json' // Set content type to JSON
          },
          body: JSON.stringify(event) // Stringify the event object
      });
      if (!response.ok) {
          throw new Error('Failed to save changes');
      }
      window.location.reload();
  } catch (error) {
      console.error('Error saving changes:', error);
  }
}


const openModalButtons = document.querySelectorAll('[data-modal-target]')
const closeModalButtons = document.querySelectorAll('[data-close-button]')
const overlay = document.getElementById('overlay')

openModalButtons.forEach(button => {
  button.addEventListener('click', () => {
    const modal = document.querySelector(button.dataset.modalTarget)
    openModal(modal)
  })
})

overlay.addEventListener('click', () => {
  const modals = document.querySelectorAll('.modal.active')
  modals.forEach(modal => {
    closeModal(modal)
  })
})

closeModalButtons.forEach(button => {
  button.addEventListener('click', () => {
    const modal = button.closest('.modal')
    closeModal(modal)
  })
})

function openModal(modal) {
  if (modal == null) return
  modal.classList.add('active')
  overlay.classList.add('active')
}

function closeModal(modal) {
  if (modal == null) return
  modal.classList.remove('active')
  overlay.classList.remove('active')
}
