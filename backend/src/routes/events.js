import express from 'express';
import Event from '../models/Event.js';
import Joi from 'joi';

const router = express.Router();

const eventSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().allow(''),
  posterUrl: Joi.string().uri().allow(''),
  date: Joi.date().required(),
  time: Joi.string().required(),
  venue: Joi.string().required(),
  price: Joi.number().required(),
  availableSeats: Joi.number().required(),
});

// Get all events
router.get('/', async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get event by id
router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ error: 'Event not found' });
    res.json(event);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Create event (admin only - add auth middleware later)
router.post('/', async (req, res) => {
  try {
    const { error } = eventSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const event = new Event(req.body);
    await event.save();
    res.status(201).json(event);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Update event (admin only - add auth middleware later)
router.put('/:id', async (req, res) => {
  try {
    const { error } = eventSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!event) return res.status(404).json({ error: 'Event not found' });
    res.json(event);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete event (admin only - add auth middleware later)
router.delete('/:id', async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) return res.status(404).json({ error: 'Event not found' });
    res.json({ message: 'Event deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
