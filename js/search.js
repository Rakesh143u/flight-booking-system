import { getFlights } from './api.js';

const form = document.getElementById('searchForm');
const resultsDiv = document.getElementById('results');

async function handleSearch(e) {
  e.preventDefault();
  const from = document.getElementById('from').value.toUpperCase();
  const to   = document.getElementById('to').value.toUpperCase();
  const date = document.getElementById('date').value;

  const flights = await getFlights();
  // client-side filter
  const filtered = flights.filter(f =>
    f.origin === from &&
    f.destination === to &&
    f.departure_time.slice(0, 10) === date
  );
  localStorage.setItem('filteredFlights', JSON.stringify(filtered));
  window.location.href = 'results.html';
}

function renderResults() {
  const flights = JSON.parse(localStorage.getItem('filteredFlights')) || [];
  if (!resultsDiv) return;
  resultsDiv.innerHTML = flights.map(f => `
    <div class="flight-item">
      <p><strong>${f.flight_number}</strong> ${f.origin} → ${f.destination}</p>
      <p>${new Date(f.departure_time).toLocaleString()} – ${new Date(f.arrival_time).toLocaleString()}</p>
      <p>Price: $${f.price}</p>
      <button onclick="selectFlight(${f.id})">Select</button>
    </div>
  `).join('');
  window.selectFlight = id => {
    const flight = flights.find(f => f.id === id);
    localStorage.setItem('selectedFlight', JSON.stringify(flight));
    window.location.href = 'booking.html';
  };
}

if (form) {
  form.addEventListener('submit', handleSearch);
} else {
  // on results.html
  renderResults();
}
