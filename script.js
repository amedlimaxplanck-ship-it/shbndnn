// =======================
// Firestore Başlangıç
// =======================
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyD-yn67AhKbiTExyrffBok2nthXhV_hL88",
  authDomain: "shbndn-12640.firebaseapp.com",
  projectId: "shbndn-12640",
  storageBucket: "shbndn-12640.appspot.com",
  messagingSenderId: "579355427179",
  appId: "1:579355427179:web:2e7fafee98f9a7da2d0c2e",
};

// Firebase initialize
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

if (slider) {
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
}

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
    toggleBtn.innerText = descText.classList.contains("expanded") ? "Daha az göster" : "Daha fazla göster";
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
// Satın Al Formu Firestore
// =======================
const purchaseForm = document.getElementById("purchaseForm");
if (purchaseForm) {
  purchaseForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const inputs = purchaseForm.querySelectorAll("input, textarea");
    const [ad, telefon, adres] = Array.from(inputs).map(i => i.value.trim());

    if (!ad || !telefon || !adres) {
      alert("Lütfen tüm alanları doldurun!");
      return;
    }

    try {
      await addDoc(collection(db, "siparisler"), {
        ad,
        telefon,
        adres,
        tarih: serverTimestamp()
      });

      alert("Siparişiniz alınmıştır 🎉");
      purchaseForm.reset();
    } catch (err) {
      console.error(err);
      alert("Bir hata oluştu ❌");
    }
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
faders.forEach(fader => appearOnScroll.observe(fader));