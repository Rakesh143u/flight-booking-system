export const API_BASE = 'http://localhost:5000/api';

export async function getFlights() {
  const res = await fetch(`${API_BASE}/flights`);
  if (!res.ok) throw new Error('Failed to fetch flights');
  return res.json();
}

export async function getSeats(flightId) {
  const res = await fetch(`${API_BASE}/flights/${flightId}/seats`);
  if (!res.ok) throw new Error('Failed to fetch seats');
  return res.json();
}

export async function bookSeat(flightId, seatId, passengerName, passengerEmail) {
  const res = await fetch(`${API_BASE}/flights/${flightId}/book`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      seat_id: seatId,
      passenger_name: passengerName,
      passenger_email: passengerEmail
    })
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Booking failed');
  return data;
}
