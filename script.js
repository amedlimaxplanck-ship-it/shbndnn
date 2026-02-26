import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyD-yn67AhKbiTExyrffBok2nthXhV_hL88",
  authDomain: "shbndn-12640.firebaseapp.com",
  projectId: "shbndn-12640",
  storageBucket: "shbndn-12640.appspot.com",
  messagingSenderId: "579355427179",
  appId: "1:579355427179:web:2e7fafee98f9a7da2d0c2e",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// TÜM VERİLERİ ÇEKME FONKSİYONU (İlan + İban + Özellikler)
async function loadSiteData() {
  const docRef = doc(db, "ilan", "ilan1");
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const data = docSnap.data();

    // 1. Ana Sayfa (index.html) Verileri
    if (document.getElementById("ilanTitle")) {
      document.getElementById("ilanTitle").innerText = data.title || "Başlık Yok";
      document.getElementById("ilanPrice").innerText = (data.price || "0") + " TL";
      document.getElementById("ilanDesc").innerText = data.description || "Açıklama yok.";
      
      // Dinamik İlan Özellikleri (Yeni Eklendi)
      document.getElementById("ilanDateText").innerText = data.adDate || "-";
      document.getElementById("ilanBrandText").innerText = data.brand || "-";
      document.getElementById("ilanModelText").innerText = data.model || "-";
      document.getElementById("ilanWarrantyText").innerText = data.warranty || "-";

      // Slider Resimleri
      const images = [data.image1, data.image2, data.image3].filter(Boolean);
      const slider = document.getElementById("slider");
      if(slider && images.length > 0){
        slider.innerHTML = images.map(src => `<img src="${src}" class="slide">`).join('');
      }
    }

    // 2. Satın Al Sayfası (satin-al.html) IBAN Verisi
    if (document.getElementById("ibanText")) {
      document.getElementById("ibanText").innerText = data.iban || "IBAN Girilmedi";
    }
  }
}

// Sayfa yüklendiğinde verileri çek
loadSiteData();

/* --- ALT KISIMDAKİ UI ETKİLEŞİMLERİ (Aynen korundu) --- */

// Favlama
const favStar = document.getElementById("favStar");
if (favStar) {
  let isFavorite = localStorage.getItem("fav_ps5") === "true";
  favStar.classList.add("fas");
  favStar.style.color = isFavorite ? "#ffc107" : "#ffffff";
  favStar.addEventListener("click", () => {
    isFavorite = !isFavorite;
    favStar.style.color = isFavorite ? "#ffc107" : "#ffffff";
    localStorage.setItem("fav_ps5", isFavorite);
  });
}

// Share butonu
const shareBtn = document.querySelector(".share-btn");
if (shareBtn) {
  shareBtn.addEventListener("click", () => {
    if (navigator.share) {
      navigator.share({
        title: document.getElementById("ilanTitle")?.innerText,
        text: "Bu ilana mutlaka bakmalısın!",
        url: window.location.href
      });
    } else {
      alert('Link kopyalandı!');
    }
  });
}

// Tab sistemi (İlan Bilgileri / Konumu)
const tabs = document.querySelectorAll('.tab');
const contents = document.querySelectorAll('.tab-content');
tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const targetId = tab.getAttribute('data-tab');
    tabs.forEach(t => t.classList.remove('active'));
    contents.forEach(c => c.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById(targetId).classList.add('active');
  });
});

// Açıklama toggle
const toggleBtn = document.getElementById("toggleDesc");
const descText = document.getElementById("ilanDesc");
if (toggleBtn && descText) {
  toggleBtn.addEventListener("click", function () {
    descText.classList.toggle("expanded");
    toggleBtn.innerText = descText.classList.contains("expanded") ? "Daha az göster" : "Daha fazla göster";
  });
}

// IBAN kopyalama
const copyBtn = document.getElementById("copyIbanBtn");
const ibanText = document.getElementById("ibanText");
if (copyBtn && ibanText) {
  copyBtn.addEventListener("click", () => {
    navigator.clipboard.writeText(ibanText.textContent.trim()).then(() => {
      copyBtn.innerText = "Kopyalandı ✓";
      copyBtn.style.background = "#28a745";
      setTimeout(() => {
        copyBtn.innerText = "Kopyala";
        copyBtn.style.background = "#20c997";
      }, 2000);
    });
  });
}
