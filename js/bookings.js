document.addEventListener('DOMContentLoaded', () => {
    const flight = JSON.parse(localStorage.getItem('selectedFlight'));
    const details = document.getElementById('flightDetails');
    if (!flight || !details) return;
  
    details.innerHTML = `
      <p><strong>${flight.flight_number}</strong></p>
      <p>${flight.origin} → ${flight.destination}</p>
      <p>${new Date(flight.departure_time).toLocaleString()} – ${new Date(flight.arrival_time).toLocaleString()}</p>
      <p>Price: $${flight.price}</p>
    `;
  
    document.getElementById('passengerForm')
      .addEventListener('submit', e => {
        e.preventDefault();
        const name  = document.getElementById('passengerName').value;
        const email = document.getElementById('passengerEmail').value;
        localStorage.setItem('passengerInfo', JSON.stringify({ name, email }));
        window.location.href = 'seats.html';
      });
  });
  