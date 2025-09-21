document.addEventListener("DOMContentLoaded", () => {
  // --- Preloader logikasi ---
  window.addEventListener("load", () => {
    const preloader = document.querySelector(".preloader");
    if (preloader) {
      preloader.classList.add("hidden");
    }
  });

  // --- Barcha sahifalar uchun "Yuqoriga" tugmasi logikasi ---
  const scrollTopBtn = document.getElementById("scrollTopBtn");

  if (scrollTopBtn) {
    const scrollHandler = () => {
      if (
        document.body.scrollTop > 100 ||
        document.documentElement.scrollTop > 100
      ) {
        scrollTopBtn.style.display = "block";
      } else {
        scrollTopBtn.style.display = "none";
      }
    };
    window.addEventListener("scroll", scrollHandler);
    scrollTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // --- Elementlarni paydo bo'lish animatsiyasi (Bosh sahifa va Ishlarim sahifasi uchun) ---
  const animatedElements = document.querySelectorAll(".portfolio-card");

  if (animatedElements.length > 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
      }
    );
    animatedElements.forEach((card) => observer.observe(card));
  }

  // --- Aloqa formasi logikasi (Faqat Aloqa sahifasi uchun) ---
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const message = document.getElementById("message").value;
      const telegramMessage = `Assalomu alaykum!\n\nIsm: ${name}\nEmail: ${email}\n\nXabar:\n${message}`;
      const telegramUsername = "Bohodirbek93";
      const telegramLink = `https://t.me/${telegramUsername}?text=${encodeURIComponent(
        telegramMessage
      )}`;
      window.open(telegramLink, "_blank");
      const formContainer = contactForm.parentElement;
      formContainer.innerHTML = `
        <div class="alert alert-success text-center" role="alert">
          <h2>Rahmat!</h2>
          <p>Xabaringiz Telegram'ga yuborish uchun tayyorlandi. Iltimos, ochilgan yangi oynada yuborishni tasdiqlang.</p>
          <button id="backButton" class="btn btn-secondary mt-3">Orqaga</button>
        </div>`;

      // "Orqaga" tugmasi uchun event listener qo'shish
      const backButton = document.getElementById("backButton");
      if (backButton) {
        backButton.addEventListener("click", () => {
          history.back();
        });
      }
    });
  }
});
