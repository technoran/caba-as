const track = document.getElementById('carouselTrack');
const carousel = document.querySelector('.carousel');
const slideCount = document.getElementById('slideCount');
const seasonToggle = document.getElementById('seasonToggle');
const seasonName = document.getElementById('seasonName');
const seasons = {
  invierno: {
    label: 'Invierno',
    nextLabel: 'Verano',
    hero: 'image/invierno/WhatsApp Image 2026-09-10 at 18.40.56 (4).jpeg',
    images: [
      ['image/invierno/WhatsApp Image 2026-09-10 at 18.40.56 (4).jpeg', 'La cabaña en invierno'],
      ['image/invierno/WhatsApp Image 2026-09-12 at 10.05.07.jpeg', 'Paisaje serrano de invierno'],
      ['image/invierno/WhatsApp Image 2026-09-12 at 10.05.11.jpeg', 'Detalles de Kuyen en invierno'],
      ['image/invierno/WhatsApp Image 2026-09-13 at 10.07.00.jpeg', 'Una pausa entre sierras']
    ]
  },
  verano: {
    label: 'Verano',
    nextLabel: 'Invierno',
    hero: 'image/verano/WhatsApp Image 2026-09-10 at 18.40.56 (1).jpeg',
    images: [
      ['image/verano/WhatsApp Image 2026-09-10 at 18.40.56 (1).jpeg', 'La cabaña en verano'],
      ['image/verano/WhatsApp Image 2026-09-10 at 18.40.56 (2).jpeg', 'Luz de verano en Kuyen'],
      ['image/verano/WhatsApp Image 2026-09-10 at 18.40.56 (3).jpeg', 'Naturaleza alrededor'],
      ['image/verano/WhatsApp Image 2026-09-10 at 18.40.57 (4).jpeg', 'El paisaje en verano'],
      ['image/verano/WhatsApp Image 2026-09-10 at 18.40.57 (1).jpeg', 'Verano entre sierras'],
      ['image/verano/WhatsApp Image 2026-09-10 at 18.40.57 (2).jpeg', 'Afuera, el paisaje'],
      ['image/verano/WhatsApp Image 2026-09-10 at 18.40.57 (3).jpeg', 'Tiempo al aire libre'],
      ['image/verano/WhatsApp Image 2026-09-10 at 18.40.57 (4).jpeg', 'Una tarde en Yacanto'],
      ['image/verano/WhatsApp Image 2026-09-10 at 18.40.57.jpeg', 'Cielo abierto'],
      ['image/verano/WhatsApp Image 2026-09-10 at 18.43.25 (1).jpeg', 'Calma de verano'],
      ['image/verano/WhatsApp Image 2026-09-10 at 18.43.25 (2).jpeg', 'Un rincón para quedarse'],
      ['image/verano/WhatsApp Image 2026-09-10 at 18.43.25 (3).jpeg', 'La pausa que buscabas'],
      ['image/verano/WhatsApp Image 2026-09-10 at 18.43.26.jpeg', 'Atardecer en las sierras']
    ]
  }
};

let currentSeason = new Date().getMonth() >= 10 || new Date().getMonth() <= 1 ? 'verano' : 'invierno';

function updateSlideCount() {
  const slides = [...track.children];
  const currentSlide = Math.min(Math.round(carousel.scrollLeft / carousel.clientWidth), slides.length - 1);
  slideCount.textContent = `${String(currentSlide + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`;
}

function renderSeason(season) {
  const seasonData = seasons[season];
  currentSeason = season;
  document.body.dataset.season = season;
  seasonName.textContent = seasonData.label;
  seasonToggle.firstChild.textContent = `${seasonData.nextLabel} `;
  document.querySelector('.hero').style.backgroundImage = `linear-gradient(90deg,rgba(17,28,21,.66),rgba(17,28,21,.12)),url("${seasonData.hero}")`;
  track.innerHTML = seasonData.images.map(([src, alt], index) => `<figure class="gallery-slide${index === 0 ? ' is-active' : ''}"><img src="${src}" alt="${alt}" loading="${index === 0 ? 'eager' : 'lazy'}"><figcaption><span>${String(index + 1).padStart(2, '0')}</span> ${alt}</figcaption></figure>`).join('');
  track.scrollLeft = 0;
  updateSlideCount();
}

seasonToggle.addEventListener('click', () => renderSeason(currentSeason === 'invierno' ? 'verano' : 'invierno'));
carousel.addEventListener('scroll', updateSlideCount, { passive: true });
renderSeason(currentSeason);

const modal = document.getElementById('bookingModal');
const bookingForm = document.getElementById('bookingForm');
const formStep = document.getElementById('bookingFormStep');
const reviewStep = document.getElementById('bookingReviewStep');
const paymentStep = document.getElementById('paymentStep');
const whatsappNumber = '5493854172687';

function setModal(open) {
  modal.classList.toggle('is-open', open);
  modal.setAttribute('aria-hidden', String(!open));
  document.body.style.overflow = open ? 'hidden' : '';
  if (!open) {
    formStep.hidden = false;
    reviewStep.hidden = true;
    paymentStep.hidden = true;
    document.getElementById('paymentSuccess').hidden = true;
  }
}

document.getElementById('openBooking').addEventListener('click', () => setModal(true));
document.getElementById('openInteriorBooking').addEventListener('click', () => setModal(true));
document.getElementById('closeBooking').addEventListener('click', () => setModal(false));
modal.addEventListener('click', (event) => {
  if (event.target === modal) setModal(false);
});

function formatDate(value) {
  const [year, month, day] = value.split('-');
  const monthNames = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
  return `${day} de ${monthNames[Number(month) - 1]} de ${year}`;
}

function getStayDays() {
  const checkIn = document.getElementById('checkIn').value;
  const checkOut = document.getElementById('checkOut').value;
  if (!checkIn || !checkOut || checkOut <= checkIn) return 0;
  return Math.round((new Date(`${checkOut}T00:00:00`) - new Date(`${checkIn}T00:00:00`)) / 86400000);
}

function updateStayDays() {
  const days = getStayDays();
  document.getElementById('stayDays').textContent = days ? `${days} ${days === 1 ? 'noche' : 'noches'} de estadía` : 'Seleccioná ingreso y egreso para calcular los días.';
}

document.getElementById('loadLocations').addEventListener('click', () => {
  document.getElementById('locationField').hidden = false;
  document.getElementById('loadLocations').classList.add('is-loaded');
  document.getElementById('loadLocations').querySelector('strong').textContent = '✓';
});
document.getElementById('checkIn').addEventListener('change', updateStayDays);
document.getElementById('checkOut').addEventListener('change', updateStayDays);

bookingForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const checkIn = document.getElementById('checkIn').value;
  const checkOut = document.getElementById('checkOut').value;
  const location = document.getElementById('location');
  const adults = document.getElementById('adults').value;
  const children = document.getElementById('children').value;
  const guestName = document.getElementById('guestName').value;
  if (checkOut <= checkIn) {
    document.getElementById('checkOut').setCustomValidity('La salida debe ser posterior a la entrada.');
    document.getElementById('checkOut').reportValidity();
    return;
  }
  document.getElementById('checkOut').setCustomValidity('');
  const stayDays = getStayDays();
  document.getElementById('reviewLocation').textContent = location.options[location.selectedIndex].text;
  document.getElementById('reviewCheckIn').textContent = formatDate(checkIn);
  document.getElementById('reviewCheckOut').textContent = formatDate(checkOut);
  document.getElementById('reviewDays').textContent = `${stayDays} ${stayDays === 1 ? 'noche' : 'noches'}`;
  document.getElementById('reviewGuests').textContent = `${adults} mayores · ${children} menores`;
  document.getElementById('reviewName').textContent = guestName;
  formStep.hidden = true;
  reviewStep.hidden = false;
  paymentStep.hidden = true;
  document.getElementById('progressOne').classList.remove('progress-active');
  document.getElementById('progressTwo').classList.add('progress-active');
});

document.getElementById('editBooking').addEventListener('click', () => {
  formStep.hidden = false;
  reviewStep.hidden = true;
  document.getElementById('progressOne').classList.add('progress-active');
  document.getElementById('progressTwo').classList.remove('progress-active');
});

document.getElementById('payDeposit').addEventListener('click', () => {
  reviewStep.hidden = true;
  paymentStep.hidden = false;
  document.getElementById('progressTwo').classList.remove('progress-active');
  document.getElementById('progressThree').classList.add('progress-active');
});

document.getElementById('backToReview').addEventListener('click', () => {
  paymentStep.hidden = true;
  reviewStep.hidden = false;
  document.getElementById('progressThree').classList.remove('progress-active');
  document.getElementById('progressTwo').classList.add('progress-active');
});

document.getElementById('confirmPayment').addEventListener('click', () => {
  document.getElementById('paymentSuccess').hidden = false;
  document.getElementById('confirmPayment').disabled = true;
});

const today = new Date().toISOString().split('T')[0];
document.getElementById('checkIn').min = today;
document.getElementById('checkOut').min = today;