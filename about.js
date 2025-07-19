document.addEventListener('DOMContentLoaded', () => {
  const joinNowBtn = document.querySelector('.btn-primary');
  if (joinNowBtn) {
    joinNowBtn.addEventListener('click', () => {
      alert('Thank you for your interest in YPL! Registration is coming soon.');
    });
  }

  const navLinks = document.querySelectorAll('nav ul li a');
  const currentPage = window.location.href;

  navLinks.forEach(link => {
    if (currentPage.includes(link.getAttribute('href'))) {
      link.classList.add('active-nav');
    }
  });

  const logoLink = document.querySelector('.logo');
  if (logoLink) {
    logoLink.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});
