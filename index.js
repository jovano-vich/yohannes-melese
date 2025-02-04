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

// Luxury Scroll Animations for sections
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

/*
  Web3Forms submission:
  With Web3Forms, you don’t need a custom JavaScript handler.
  The form submits directly to the Web3Forms endpoint specified in the HTML.
  
  Therefore, the previous Netlify handler has been removed.
  
  If you want to add custom behavior after submission (such as resetting the form
  or displaying a custom success message), you can attach an event listener to the form
  and handle it accordingly. For now, the form submission is handled natively.
*/
