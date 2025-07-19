// script.js

const api = 'http://localhost:3000/api';

// Set Countdown based on upcoming match
async function initCountdown() {
  const res = await fetch(`${api}/upcoming`);
  const match = await res.json();
  const countdownTime = new Date(match.match_datetime).getTime();

  function countdown() {
    const now = new Date().getTime();
    const t = countdownTime - now;

    if (t <= 0) {
      document.querySelector('.countdown').innerText = 'Match started/ended';
      return;
    }

    const days = Math.floor(t / (1000 * 60 * 60 * 24));
    const hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((t / (1000 * 60)) % 60);
    const seconds = Math.floor((t / 1000) % 60);

    document.getElementById('days').innerText = days;
    document.getElementById('hours').innerText = hours;
    document.getElementById('minutes').innerText = minutes;
    document.getElementById('seconds').innerText = seconds;
  }

  setInterval(countdown, 1000);
  countdown();
}

// Load Matches dynamically
async function loadMatches() {
  const res = await fetch(`${api}/matches`);
  const data = await res.json();

  const container = document.querySelector('.match-cards');
  if (!container) return;

  container.innerHTML = '';
  data.forEach(match => {
    container.innerHTML += `
      <div class="match-card">
        <p>${match.teamA} <strong>${match.score_a}:${match.score_b}</strong> ${match.teamB}</p>
        <small>${new Date(match.match_datetime).toLocaleString()}</small>
      </div>
    `;
  });
}

// Load Players Data
async function loadPlayers() {
  const res = await fetch(`${api}/players`);
  const data = await res.json();

  const container = document.querySelector('#players');
  if (!container) return;

  container.innerHTML = '';
  data.forEach(player => {
    container.innerHTML += `
      <div class="player-card">
        <p><strong>${player.name}</strong> - ${player.team}</p>
      </div>
    `;
  });
}

// script.js

// Wait for page to fully load
document.addEventListener('DOMContentLoaded', () => {
  // Add functionality to "Join Now" button (example: redirect or modal trigger)
  const joinNowBtn = document.querySelector('.btn-primary');
  if (joinNowBtn) {
    joinNowBtn.addEventListener('click', () => {
      // Replace the alert with actual logic like opening a registration form
      alert('Thank you for your interest in YPL! Registration is coming soon.');
    });
  }

  // Highlight current page in navigation (optional enhancement)
  const navLinks = document.querySelectorAll('nav ul li a');
  const currentPage = window.location.href;

  navLinks.forEach(link => {
    if (currentPage.includes(link.getAttribute('href'))) {
      link.classList.add('active-nav');
    }
  });

  // Optional: Smooth scroll to top when logo is clicked
  const logoLink = document.querySelector('.logo');
  if (logoLink) {
    logoLink.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Optionally hide broken images to avoid layout breaking (already done inline)
});


// Initialize everything
initCountdown();
loadMatches();
loadPlayers();
