import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// MongoDB connection
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/ticketbooking';
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});

import authRoutes from './routes/auth.js';

// Basic route
app.get('/', (req, res) => {
  res.send('Ticket Booking API is running');
});

// Routes
app.use('/api/auth', authRoutes);

import eventRoutes from './routes/events.js';
app.use('/api/events', eventRoutes);

import bookingRoutes from './routes/bookings.js';
app.use('/api/bookings', bookingRoutes);



// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
