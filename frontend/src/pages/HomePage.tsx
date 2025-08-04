import React from 'react';
import { useGetEventsQuery } from '../store/api';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {
  const { data: events, error, isLoading } = useGetEventsQuery();
  const navigate = useNavigate();

  if (isLoading) return <div>Loading events...</div>;
  if (error) return <div>Error loading events</div>;

  return (
    <div style={{ maxWidth: 1200, margin: 'auto', padding: 20 }}>
      <h1>Events</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20 }}>
        {events && events.map((event: any) => (
          <Card key={event._id} title={event.title} style={{ width: '300px' }}>
            <img src={event.posterUrl} alt={event.title} style={{ width: '100%', height: 200, objectFit: 'cover' }} />
            <p>{event.description}</p>
            <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
            <p><strong>Time:</strong> {event.time}</p>
            <p><strong>Venue:</strong> {event.venue}</p>
            <p><strong>Price:</strong> ${event.price}</p>
            <Button label="View Details" onClick={() => navigate(`/events/${event._id}`)} />
          </Card>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
