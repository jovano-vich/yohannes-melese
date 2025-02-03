// Toggle mobile menu
function toggleMenu() {
  const navLinks = document.querySelector('.links');
  navLinks.classList.toggle('active');
}

// Testimonials Carousel
let currentSlide = 0;
const slides = document.querySelectorAll('.testimonial-card');

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === index);
  });
}

function moveSlide(direction) {
  currentSlide = (currentSlide + direction + slides.length) % slides.length;
  showSlide(currentSlide);
}

// Initialize first testimonial slide
showSlide(currentSlide);

// Luxury Scroll Animations
const sections = document.querySelectorAll('section');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // For skills section, trigger progress bar animation (if needed)
        if (entry.target.id === 'skills') {
          document.querySelectorAll('.progress').forEach((progress) => {
            progress.style.width = progress.style.width; // retrigger CSS transition
          });
        }
      }
    });
  },
  { threshold: 0.15 }
);

sections.forEach((section) => {
  sectionObserver.observe(section);
});

// Skill Bar Hover Effect
document.querySelectorAll('.progress-bar').forEach((bar) => {
  bar.addEventListener('mouseenter', () => {
    bar.style.transform = 'scaleX(1.02)';
  });
  bar.addEventListener('mouseleave', () => {
    bar.style.transform = 'scaleX(1)';
  });
});

// Parallax Effect for Profile Image in Hero Section
window.addEventListener('scroll', () => {
  const profileImg = document.querySelector('.image img');
  const scrolled = window.pageYOffset;
  profileImg.style.transform = `translateY(${scrolled * 0.1}px)`;
});

// About Section Scroll Animation
const aboutSection = document.querySelector('#about');
const aboutImage = document.querySelector('.about-image');
const aboutContent = document.querySelector('.about-content');
const bioLines = document.querySelectorAll('.bio-line');
const aboutButton = document.querySelector('#about button');

const aboutObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        aboutImage.classList.add('visible');
        aboutContent.classList.add('visible');
        // Animate bio lines sequentially
        bioLines.forEach((line, index) => {
          setTimeout(() => {
            line.classList.add('visible');
          }, index * 300);
        });
        // Animate the button after the bio lines
        setTimeout(() => {
          if (aboutButton) {
            aboutButton.classList.add('visible');
          }
        }, bioLines.length * 300 + 200);
      }
    });
  },
  { threshold: 0.3 }
);

aboutObserver.observe(aboutSection);

// --- Netlify Contact Form Handler ---
// Select the contact form (ensure you're selecting the correct one)
const contactForm = document.querySelector('form[name="contact"]');

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const form = e.target;
  const submitButton = form.querySelector('button[type="submit"]');

  // Show loading state
  submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

  try {
    const formData = new FormData(form);
    // Ensure the hidden form-name field is appended
    formData.append('form-name', 'contact');

    const response = await fetch('/', {
      method: 'POST',
      body: formData,
      headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
      form.reset();
      alert("Message sent successfully! I'll respond within 24 hours.");
    } else {
      alert('Oops! Something went wrong. Please try again.');
    }
  } catch (error) {
    alert('Network error. Please check your connection.');
  }

  // Reset button text
  submitButton.innerHTML = 'Send Message';
});
