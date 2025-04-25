import { getSeats, bookSeat } from './api.js';

document.addEventListener('DOMContentLoaded', async () => {
  const flight    = JSON.parse(localStorage.getItem('selectedFlight'));
  const passenger = JSON.parse(localStorage.getItem('passengerInfo'));
  const grid      = document.getElementById('seatGrid');
  if (!flight || !passenger || !grid) return;

  const seats = await getSeats(flight.id);
  grid.innerHTML = seats.map(s => `
    <button class="seat ${s.is_booked ? 'booked' : ''}"
            ${s.is_booked ? 'disabled' : ''}
            data-seat-id="${s.id}">
      ${s.seat_number}
    </button>
  `).join('');

  grid.addEventListener('click', async e => {
    const btn = e.target;
    if (!btn.matches('button.seat') || btn.disabled) return;
    const seatId = btn.getAttribute('data-seat-id');
    try {
      await bookSeat(flight.id, seatId, passenger.name, passenger.email);
      window.location.href = 'success.html';
    } catch (err) {
      alert('Booking failed: ' + err.message);
    }
  });
});
