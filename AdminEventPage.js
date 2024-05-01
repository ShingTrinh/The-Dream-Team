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

function createEventBlock(event) {
  const eventBlock = document.createElement('div');
  eventBlock.classList.add('event');

  eventBlock.innerHTML = `
    <h3>ID: ${event.id}</h3>
    <h3>${event.title}</h3>
    <p>${event.description}</p>
    <p>Date: ${event.date.substring(0,10)}</p>
    <p>Time: ${event.time}</p>
    <p>Categories: ${event.categories}</p>
    
    <button class="open-modal-btn" data-modal-target="#modal">Edit</button>
    <div class="modal" id="modal">
      <div class="modal-header">
        <div class="title">Example Modal</div>
        <button data-close-button class="close-button">&times;</button>
      </div>
      <div class="modal-body">
      </div>`;

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

  modalTitle.textContent = "Event ID: " + event.id;

  modalBody.innerHTML = `
    <label for="title">Title</label>
    <input type="text" id="titleInput" value="${event.title}" ><br>
    <label for="descriptionInput">Description</label><br>
    <textarea id="descriptionInput" rows="4" cols="50">${event.description}</textarea><br>
    <label for="dateInput">Date</label>
    <input type="text" id="dateInput" value="${event.date.substring(0,10)}"><br>
    <label for="timeInput">Time</label>
    <input type="text" id="timeInput" value="${event.time}"><br>
    <label for="categoriesInput">Categories</label>
    <input type="text" id="categoriesInput" value="${event.categories}"><br>
    <button>Save Changes</button>
    `;

  openModal(modal);
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

fetchEvents();
