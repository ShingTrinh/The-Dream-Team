const express = require('express');
const router = express.Router();
const eventController = require('../../controllers/eventsController')
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');


router.route('/')
    .get(eventController.getAllEvents)
    .post(eventController.createNewEvent)  //verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),
    .put(eventController.updateEvent)
    .delete(verifyRoles(ROLES_LIST.Admin),eventController.deleteEvent)

router.route('/:id')
    .get(eventController.getEvent);

module.exports = router;