// script.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// Firebase config
const firebaseConfig = {
  apiKey: "...",
  authDomain: "...",
  projectId: "...",
  storageBucket: "...",
  messagingSenderId: "...",
  appId: "..."
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// =======================
// Slider Resimleri
// =======================
const slider = document.getElementById("slider");
const slides = [
  "ps5-1.jpg",
  "ps5-2.jpg",
  "ps5-3.jpg"
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
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const db = getFirestore(app); // app Firebase initialize edilmiş olmalı

document.getElementById("purchaseForm").addEventListener("submit", async function(e){
    e.preventDefault();

    const ad = this.querySelector('input[type="text"]').value;
    const telefon = this.querySelector('input[type="tel"]').value;
    const adres = this.querySelector('textarea').value;

    try {
        await addDoc(collection(db, "siparisler"), {
            ad,
            telefon,
            adres,
            tarih: serverTimestamp()
        });

        alert("Siparişiniz gönderildi ✅");
        this.reset();
    } catch(err) {
        alert("Hata oluştu ❌ " + err.message);
    }
});

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