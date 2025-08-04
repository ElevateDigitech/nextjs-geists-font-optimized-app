import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  seats: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  bookingDate: { type: Date, default: Date.now },
  status: { type: String, enum: ['booked', 'cancelled'], default: 'booked' },
  ticketQRCode: { type: String }, // Store QR code data or URL
}, { timestamps: true });

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;
