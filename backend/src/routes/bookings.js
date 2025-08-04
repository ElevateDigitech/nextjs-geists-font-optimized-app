import express from 'express';
import Booking from '../models/Booking.js';
import Event from '../models/Event.js';
import Joi from 'joi';

const router = express.Router();

const bookingSchema = Joi.object({
  event: Joi.string().required(),
  user: Joi.string().required(),
  seats: Joi.number().min(1).required(),
  totalPrice: Joi.number().required(),
});

// Get bookings for a user
router.get('/user/:userId', async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.params.userId }).populate('event');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Create a booking
router.post('/', async (req, res) => {
  try {
    const { error } = bookingSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const { event: eventId, user, seats, totalPrice } = req.body;

    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ error: 'Event not found' });

    if (event.availableSeats < seats) {
      return res.status(400).json({ error: 'Not enough seats available' });
    }

    event.availableSeats -= seats;
    await event.save();

    const booking = new Booking({ event: eventId, user, seats, totalPrice });
    await booking.save();

    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
