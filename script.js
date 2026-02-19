// script.js

// =======================
// Slider Resimleri
// =======================
const slider = document.getElementById("slider");
const slides = [
  "resimler/ps5-1.jpg",
  "resimler/ps5-2.jpg",
  "resimler/ps5-3.jpg"
];

// Sliderı doldur
slider.innerHTML = "";
slides.forEach(src => {
  const img = document.createElement("img");
  img.src = src;
  img.className = "slide";
  slider.appendChild(img);
});

const indicator = document.getElementById("photoIndicator");

slider.addEventListener("scroll", () => {
  const index = Math.round(slider.scrollLeft / slider.clientWidth);
  indicator.textContent = `${index + 1} / ${slides.length}`;
});

// =======================
// Favlama
// =======================
const favStar = document.getElementById("favStar");

if (favStar) {
  favStar.addEventListener("click", () => {
    favStar.classList.toggle("active");
  });
}

// =======================
// Share Butonu
// =======================
const shareBtn = document.querySelector(".share-btn");

if (shareBtn) {
  shareBtn.addEventListener("click", () => {
    const shareData = {
      title: 'PS5 DİJİTAL SLİM - 23.999 TL',
      text: 'İstanbul / Kadıköy - Detaylar için bakın!',
      url: window.location.href
    };

    if (navigator.share) {
      navigator.share(shareData).catch(err => console.log(err));
    } else {
      prompt("Linki kopyalayın:", window.location.href);
    }
  });
}

// =======================
// Açıklama toggle
// =======================
const toggleBtn = document.getElementById("toggleDesc");
const descText = document.getElementById("descText");

if (toggleBtn) {
  toggleBtn.addEventListener("click", function () {
    descText.classList.toggle("expanded");

    if (descText.classList.contains("expanded")) {
      toggleBtn.innerText = "Daha az göster";
    } else {
      toggleBtn.innerText = "Daha fazla göster";
    }
  });
}

// =======================
// Tab Sistemi
// =======================
const tabs = document.querySelectorAll('.tab');
const contents = document.querySelectorAll('.tab-content');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    contents.forEach(c => c.classList.remove('active'));

    tab.classList.add('active');
    document.getElementById(tab.dataset.tab).classList.add('active');
  });
});

// =======================
// Admin form (yalnızca form gönderme)
// =======================
const purchaseForm = document.getElementById("purchaseForm");
if (purchaseForm) {
  purchaseForm.addEventListener("submit", function(e){
    e.preventDefault();
    alert("Siparişiniz alınmıştır 🎉");
    purchaseForm.reset();
  });
}

// =======================
// Photo fade-up efekti
// =======================
const faders = document.querySelectorAll(".fade-up");

const appearOptions = { threshold: 0.2 };

const appearOnScroll = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("show");
    observer.unobserve(entry.target);
  });
}, appearOptions);

faders.forEach(fader => {
  appearOnScroll.observe(fader);
});