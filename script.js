// Favlama (içi dolu beyaz yıldız → sarı → tekrar beyaz)
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
    const shareData = {
      title: document.getElementById("ilanTitle").innerText,
      text: document.getElementById("ilanDesc").innerText,
      url: window.location.href
    };
    if (navigator.share) {
      navigator.share(shareData);
    } else {
      alert('Link kopyalandı: ' + window.location.href);
    }
  });
}

// Tab sistemi
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

// Firebase setup
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

// IBAN yükleme
async function loadIban() {
  const docRef = doc(db, "ilan", "ilan1"); // 'ilanlar' -> 'ilan'
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const data = docSnap.data();
    const ibanText = document.getElementById("ibanText");
    if (ibanText) {
        ibanText.innerText = data.iban || "TR00 0000 0000 0000 0000 0000 00"; 
    }
  }
}

loadIban();

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
    }).catch(() => {
      alert("Kopyalama başarısız!");
    });
  });
}