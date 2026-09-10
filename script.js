const slides = [...document.querySelectorAll('.gallery-slide')];
const track = document.getElementById('carouselTrack');
const slideCount = document.getElementById('slideCount');
let currentSlide = 0;

function moveCarousel(direction) {
  currentSlide = (currentSlide + direction + slides.length) % slides.length;
  track.style.transform = `translateX(-${currentSlide * 100}%)`;
  slides.forEach((slide, index) => slide.classList.toggle('is-active', index === currentSlide));
  slideCount.textContent = `${String(currentSlide + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`;
}

document.getElementById('nextSlide').addEventListener('click', () => moveCarousel(1));
document.getElementById('prevSlide').addEventListener('click', () => moveCarousel(-1));

const modal = document.getElementById('bookingModal');
const bookingForm = document.getElementById('bookingForm');
const formStep = document.getElementById('bookingFormStep');
const reviewStep = document.getElementById('bookingReviewStep');
const whatsappNumber = '5493854172687';

function setModal(open) {
  modal.classList.toggle('is-open', open);
  modal.setAttribute('aria-hidden', String(!open));
  document.body.style.overflow = open ? 'hidden' : '';
  if (!open) {
    formStep.hidden = false;
    reviewStep.hidden = true;
  }
}

document.getElementById('openBooking').addEventListener('click', () => setModal(true));
document.getElementById('closeBooking').addEventListener('click', () => setModal(false));
modal.addEventListener('click', (event) => {
  if (event.target === modal) setModal(false);
});

function formatDate(value) {
  const [year, month, day] = value.split('-');
  const monthNames = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
  return `${day} de ${monthNames[Number(month) - 1]} de ${year}`;
}

bookingForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const checkIn = document.getElementById('checkIn').value;
  const checkOut = document.getElementById('checkOut').value;
  const guestName = document.getElementById('guestName').value;
  if (checkOut <= checkIn) {
    document.getElementById('checkOut').setCustomValidity('La salida debe ser posterior a la entrada.');
    document.getElementById('checkOut').reportValidity();
    return;
  }
  document.getElementById('checkOut').setCustomValidity('');
  const guests = document.getElementById('guests');
  document.getElementById('reviewCheckIn').textContent = formatDate(checkIn);
  document.getElementById('reviewCheckOut').textContent = formatDate(checkOut);
  document.getElementById('reviewGuests').textContent = guests.options[guests.selectedIndex].text;
  document.getElementById('reviewName').textContent = guestName;
  document.getElementById('sendWhatsApp').href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Hola, soy ${guestName}. Quisiera consultar disponibilidad en Kuyen para el ${formatDate(checkIn)} hasta el ${formatDate(checkOut)}. Somos ${guests.value} huésped${guests.value === '1' ? '' : 'es'}.`)}`;
  formStep.hidden = true;
  reviewStep.hidden = false;
  document.getElementById('progressOne').classList.remove('progress-active');
  document.getElementById('progressTwo').classList.add('progress-active');
});

document.getElementById('editBooking').addEventListener('click', () => {
  formStep.hidden = false;
  reviewStep.hidden = true;
  document.getElementById('progressOne').classList.add('progress-active');
  document.getElementById('progressTwo').classList.remove('progress-active');
});

const today = new Date().toISOString().split('T')[0];
document.getElementById('checkIn').min = today;
document.getElementById('checkOut').min = today;