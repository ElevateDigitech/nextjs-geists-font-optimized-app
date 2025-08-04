import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';

const BookingPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { event, seats } = location.state || {};

  if (!event || !seats) {
    return <div>No booking information available.</div>;
  }

  const totalPrice = event.price * seats;

  const handleProceedToPayment = () => {
    navigate('/payment', { state: { event, seats, totalPrice } });
  };

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
      <Card title="Booking Summary">
        <p><strong>Event:</strong> {event.title}</p>
        <p><strong>Seats:</strong> {seats}</p>
        <p><strong>Total Price:</strong> ${totalPrice}</p>
        <Button label="Proceed to Payment" onClick={handleProceedToPayment} />
      </Card>
    </div>
  );
};

export default BookingPage;
