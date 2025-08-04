import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';

const PaymentPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { event, seats, totalPrice } = location.state || {};

  if (!event || !seats || !totalPrice) {
    return <div>No payment information available.</div>;
  }

  const handlePayment = () => {
    // TODO: Implement payment processing or mock payment
    alert('Payment successful! Your tickets are booked.');
    navigate('/profile');
  };

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
      <Card title="Payment">
        <p><strong>Event:</strong> {event.title}</p>
        <p><strong>Seats:</strong> {seats}</p>
        <p><strong>Total Price:</strong> ${totalPrice}</p>
        <Button label="Pay Now" onClick={handlePayment} />
      </Card>
    </div>
  );
};

export default PaymentPage;
