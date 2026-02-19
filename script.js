// script.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

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

// -------------------
// SLIDER
// -------------------
const resimler = ["ps5-1.jpg","ps5-2.jpg","ps5-3.jpg"];
const slider = document.getElementById("slider");
const indicator = document.getElementById("photoIndicator");

if (slider && indicator) {
    slider.innerHTML = resimler.map(src => `<img src="${src}" class="slide">`).join('');
    const slides = slider.querySelectorAll(".slide");
    
    slider.addEventListener("scroll", () => {
        const index = Math.round(slider.scrollLeft / slider.clientWidth);
        indicator.textContent = `${index + 1} / ${slides.length}`;
    });
}

// -------------------
// FAVORİ STAR
// -------------------
const favStar = document.getElementById("favStar");
if(favStar){
    favStar.addEventListener("click", ()=> favStar.classList.toggle("active"));
}

// -------------------
// PAYLAŞ IKONU
// -------------------
const shareBtn = document.querySelector(".share-btn");
if(shareBtn){
    shareBtn.addEventListener("click", ()=>{
        const shareData = {
            title: document.querySelector(".ad-title")?.innerText || 'İlan Detayı',
            text: 'Detaylar için bakın!',
            url: window.location.href
        };
        if(navigator.share){
            navigator.share(shareData);
        } else {
            alert('Link: ' + window.location.href);
        }
    });
}

// -------------------
// FIRESTORE İLAN VERİLERİ
// -------------------
async function loadAd(){
    const docRef = doc(db, "ilan", "ilan1");
    const docSnap = await getDoc(docRef);
    
    if(docSnap.exists()){
        const data = docSnap.data();
        
        // İlan başlık, fiyat, açıklama
        const titleEl = document.querySelector(".ad-title");
        const priceEl = document.querySelector(".price");
        const descEl = document.getElementById("descText");
        if(titleEl) titleEl.innerText = data.title || titleEl.innerText;
        if(priceEl) priceEl.innerText = data.price || priceEl.innerText;
        if(descEl) descEl.innerText = data.description || descEl.innerText;

        // Resim varsa slidera ekle
        if(data.imageUrl){
            slider.innerHTML = `<img src="${data.imageUrl}" class="slide">`;
            indicator.textContent = "1 / 1";
        }
    }
}

// -------------------
// Açıklama toggle
// -------------------
const toggleBtn = document.getElementById("toggleDesc");
const descText = document.getElementById("descText");
if(toggleBtn && descText){
    toggleBtn.addEventListener("click", ()=>{
        descText.classList.toggle("expanded");
        toggleBtn.innerText = descText.classList.contains("expanded") ? "Daha az göster" : "Daha fazla göster";
    });
}

// -------------------
// TAB GEÇİŞ
// -------------------
const tabs = document.querySelectorAll(".tab");
const contents = document.querySelectorAll(".tab-content");
tabs.forEach(tab=>{
    tab.addEventListener("click", ()=>{
        tabs.forEach(t=>t.classList.remove("active"));
        contents.forEach(c=>c.classList.remove("active"));
        tab.classList.add("active");
        document.getElementById(tab.dataset.tab).classList.add("active");
    });
});

// -------------------
// IBAN KOPYALA
// -------------------
const copyBtn = document.getElementById("copyIbanBtn");
if(copyBtn){
    copyBtn.addEventListener("click", ()=>{
        const ibanText = document.getElementById("ibanText").innerText;
        navigator.clipboard.writeText(ibanText).then(()=>{
            copyBtn.innerText = "Kopyalandı ✓";
            setTimeout(()=>copyBtn.innerText = "Kopyala", 2000);
        });
    });
}

// -------------------
// Sayfa yüklenince ilan çek
// -------------------
window.onload = loadAd;

// -------------------
// SCROLL FADE-UP
// -------------------
const faders = document.querySelectorAll(".fade-up");
const appearOptions = {threshold:0.2};
const appearOnScroll = new IntersectionObserver((entries, observer)=>{
    entries.forEach(entry=>{
        if(!entry.isIntersecting) return;
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
    });
}, appearOptions);
faders.forEach(fader=>appearOnScroll.observe(fader));