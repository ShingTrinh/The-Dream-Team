const Event = require('../models/Event');

const getAllEvents = async (req, res) => {
    const events = await Event.find();
    if (!events) return res.status(204).json({ 'message': 'No events found.' });
    res.json(events);
}

const createNewEvent = async (req, res) => {

    console.log('Request body:', req.body);

    const { title, date, description,time,categories } = req.body;

    if (!title || !date || !description || !time || !categories) return res.status(400).json({ 'message': 'Please Fill Out All Boxes.' });
    console.log("passed");
    try {
        const result = await Event.create({
            title: req.body.title,
            date: req.body.date,
            description: req.body.description,
            time: req.body.time,
            categories: req.body.cateogires
        });

        res.status(201).json(result);
    } catch (err) {
        console.error(err);
    }
}

const updateEvent = async (req, res) => {
    try {
        const { title, date, description, time, categories } = req.body;

        const event = await Event.findById(req.body.id);

        if (!event) {
            return res.status(204).json({ message: `No event matches ID ${req.body.id}.` });
        }
        if (title) event.title = title;
        if (date) event.date = date;
        if (description) event.description = description;
        if (time) event.time = time;
        if (categories) event.categories = categories;

        const result = await event.save();

        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

const deleteEvent = async (req, res) => {
    if (!req?.body?.id) return res.status(400).json({ 'message': 'Event ID required.' });

    const event = await Event.findOne({ _id: req.body.id }).exec();
    if (!event) {
        return res.status(204).json({ "message": `No event matches ID ${req.body.id}.` });
    }
    const result = await event.deleteOne(); //{ _id: req.body.id }
    res.json(result);
}

const getEvent = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ 'message': 'Event ID required.' });

    const event = await Event.findOne({ _id: req.params.id }).exec();
    if (!event) {
        return res.status(204).json({ "message": `No event matches ID ${req.params.id}.` });
    }
    res.json(event);
}

module.exports = {
    getAllEvents,
    createNewEvent,
    updateEvent,
    deleteEvent,
    getEvent
};