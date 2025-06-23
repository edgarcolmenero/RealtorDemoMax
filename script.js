// script.js (Revised - Listings + Contact Fix)

document.addEventListener("DOMContentLoaded", () => {
  // --------- Listings Data ---------
  const listings = [
    {
      title: "Modern Downtown Condo",
      description: "A stylish 2-bed, 2-bath condo in the heart of downtown Dallas.",
      price: "$420,000",
      image: "IMG_4458.jpg"
    },
    {
      title: "Spacious Suburban Retreat",
      description: "4-bed family home with large backyard and newly renovated kitchen.",
      price: "$599,000",
      image: "IMG_4459.jpg"
    },
    {
      title: "Charming Starter Home",
      description: "3-bedroom home perfect for first-time buyers, located in a quiet neighborhood.",
      price: "$315,000",
      image: "IMG_4460.jpg"
    }
  ];

  const listingContainer = document.querySelector(".listing-carousel");
  if (listingContainer) {
    listings.forEach(({ title, description, price, image }) => {
      const card = document.createElement("div");
      card.className = "listing-card reveal";
      card.innerHTML = `
        <img src="${image}" alt="${title}" loading="lazy" />
        <h4 class="reveal">${title}</h4>
        <p class="reveal">${description}</p>
        <span class="reveal">${price}</span>
      `;
      listingContainer.appendChild(card);
    });
  }

  // --------- Testimonials Data ---------
  const testimonials = [
    {
      quote: "Edgar was an amazing help — professional, knowledgeable, and so patient!",
      author: "Samantha L."
    },
    {
      quote: "We sold our house above asking thanks to Edgar’s strategy. Highly recommend!",
      author: "Jason & Marissa"
    },
    {
      quote: "From the first showing to closing day, Edgar made the process smooth and stress-free.",
      author: "Carlos V."
    }
  ];

  const testimonialContainer = document.querySelector(".testimonial-bubbles");
  if (testimonialContainer && testimonialContainer.innerHTML.trim() === "") {
    testimonials.forEach(({ quote, author }) => {
      const bubble = document.createElement("div");
      bubble.className = "testimonial-bubble reveal";
      bubble.innerHTML = `
        <p>\"${quote}\"</p>
        <strong>- ${author}</strong>
      `;
      testimonialContainer.appendChild(bubble);
    });
  }

  // --------- Reveal Animation ---------
  const revealElements = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, {
    threshold: 0.1
  });

  revealElements.forEach(el => observer.observe(el));

  // --------- Smooth Scroll ---------
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // --------- Form Submission + Confirmation ---------
  const form = document.getElementById("contact-form");
  const confirmation = document.getElementById("confirmation-message");

  if (form && confirmation) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      form.reset();
      confirmation.textContent = "Thanks for your message! I’ll respond within 1–3 business days.";
      confirmation.classList.add("show");

      // Confetti effect
      for (let i = 0; i < 50; i++) {
        const confetti = document.createElement("div");
        confetti.style.position = "fixed";
        confetti.style.top = Math.random() * window.innerHeight + "px";
        confetti.style.left = Math.random() * window.innerWidth + "px";
        confetti.style.width = "5px";
        confetti.style.height = "5px";
        confetti.style.backgroundColor = "#000";
        confetti.style.boxShadow = "0 0 8px 2px rgba(0, 0, 0, 0.5)";
        confetti.style.animation = "glowPulse 3s infinite ease-in-out";
        confetti.style.opacity = 1;
        confetti.style.borderRadius = "50%";
        confetti.style.transition = "opacity 3s ease";
        document.body.appendChild(confetti);

        setTimeout(() => {
          confetti.style.opacity = 0;
          setTimeout(() => confetti.remove(), 3000);
        }, 50);
      }

      // Auto-hide confirmation after 4s
      setTimeout(() => {
        confirmation.classList.remove("show");
        confirmation.textContent = "";
      }, 4000);
    });
  }
});

function generateMovingStars(count = 50) {
  const stars = [];

  for (let i = 0; i < count; i++) {
    const star = document.createElement("div");
    star.className = "star";

    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;

    star.style.left = `${x}px`;
    star.style.top = `${y}px`;

    document.body.appendChild(star);
    stars.push({ el: star, x, y });
  }

  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    stars.forEach(({ el, y }) => {
      el.style.transform = `translateY(${scrollY * 0.05}px)`;
    });
  });
}

generateMovingStars();

