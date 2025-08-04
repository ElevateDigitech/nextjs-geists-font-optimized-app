import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { useGetBookingsQuery } from '../store/api';
import { Card } from 'primereact/card';

const ProfilePage: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const { data: bookings, error, isLoading } = useGetBookingsQuery(user?.id || '');

  if (isLoading) return <div>Loading bookings...</div>;
  if (error) return <div>Error loading bookings</div>;

  return (
    <div style={{ maxWidth: 800, margin: 'auto', padding: 20 }}>
      <h1>{user?.username}'s Profile</h1>
      <h2>Booking History</h2>
      {bookings && bookings.length > 0 ? (
        bookings.map((booking: any) => (
          <Card key={booking._id} title={booking.event.title} style={{ marginBottom: 20 }}>
            <p><strong>Seats:</strong> {booking.seats}</p>
            <p><strong>Total Price:</strong> ${booking.totalPrice}</p>
            <p><strong>Status:</strong> {booking.status}</p>
            <p><strong>Booking Date:</strong> {new Date(booking.bookingDate).toLocaleDateString()}</p>
          </Card>
        ))
      ) : (
        <p>No bookings found.</p>
      )}
    </div>
  );
};

export default ProfilePage;
