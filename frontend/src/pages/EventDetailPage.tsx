import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetEventByIdQuery } from '../store/api';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { InputNumber } from 'primereact/inputnumber';

const EventDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: event, error, isLoading } = useGetEventByIdQuery(id || '');
  const [seats, setSeats] = useState(1);
  const navigate = useNavigate();

  if (isLoading) return <div>Loading event details...</div>;
  if (error) return <div>Error loading event details</div>;
  if (!event) return <div>Event not found</div>;

  const handleBooking = () => {
    // TODO: Implement booking logic
    console.log('Booking seats:', seats);
    navigate('/payment', { state: { event, seats } });
  };

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
      <Card title={event.title}>
        <img src={event.posterUrl} alt={event.title} style={{ width: '100%', height: 300, objectFit: 'cover' }} />
        <p>{event.description}</p>
        <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
        <p><strong>Time:</strong> {event.time}</p>
        <p><strong>Venue:</strong> {event.venue}</p>
        <p><strong>Price:</strong> ${event.price}</p>
        <p><strong>Available Seats:</strong> {event.availableSeats}</p>
        <div style={{ marginTop: 20 }}>
          <label htmlFor="seats">Number of Seats:</label>
          <InputNumber id="seats" value={seats} onValueChange={(e) => setSeats(e.value || 1)} min={1} max={event.availableSeats} />
        </div>
        <Button label="Book Now" onClick={handleBooking} disabled={seats < 1 || seats > event.availableSeats} style={{ marginTop: 20 }} />
      </Card>
    </div>
  );
};

export default EventDetailPage;
