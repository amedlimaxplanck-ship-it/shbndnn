// script.js - Temiz ve çalışan hali

// =======================
// RESİMLER (aynı klasörde olduğu için direkt isim)
const slides = ["ps5-1.jpg", "ps5-2.jpg", "ps5-3.jpg"];

// =======================
// 1. Resim Listesi (Klasördeki isimlerle birebir aynı olmalı)
const slides = ["ps5-1.jpg", "ps5-2.jpg", "ps5-3.jpg"];

const slider = document.getElementById("slider");
const indicators = document.querySelectorAll(".photo-indicator"); // Class olarak seçtik

if (slider) {
    // Önce içini dolduralım
    slider.innerHTML = slides.map(src => `<img src="${src}" class="slide">`).join('');

    // Kaydırma fonksiyonu
    slider.addEventListener("scroll", () => {
        // Genişliği tam sayıya yuvarlayarak hangi fotoda olduğumuzu buluyoruz
        const index = Math.round(slider.scrollLeft / slider.clientWidth);
        
        // Tüm indikatörleri (hem alttaki hem varsa üstteki) güncelle
        indicators.forEach(el => {
            el.textContent = `${index + 1} / ${slides.length}`;
        });
    });
}



// =======================
// Favlama (içi dolu beyaz yıldız → sarı → tekrar beyaz)
const favStar = document.getElementById("favStar");
if (favStar) {
  let isFavorite = localStorage.getItem("fav_ps5") === "true";
  favStar.classList.add("fas"); // başlangıçta dolu

  if (isFavorite) {
    favStar.style.color = "#ffc107";
  } else {
    favStar.style.color = "#ffffff";
  }

  favStar.addEventListener("click", () => {
    isFavorite = !isFavorite;
    favStar.style.color = isFavorite ? "#ffc107" : "#ffffff";
    localStorage.setItem("fav_ps5", isFavorite);
  });
}

// =======================
// Share butonu
const shareBtn = document.querySelector(".share-btn");
if (shareBtn) {
  shareBtn.addEventListener("click", () => {
    const shareData = {
      title: 'PS5 DİJİTAL SLİM - 23.999 TL',
      text: 'İstanbul / Kadıköy - Detaylar için bakın!',
      url: window.location.href
    };
    if (navigator.share) {
      navigator.share(shareData);
    } else {
      alert('Link kopyalandı: ' + window.location.href);
    }
  });
}

// =======================
// Tab Sistemi (İlan Bilgileri / Konumu) - DÜZELTİLDİ
// =======================
const tabs = document.querySelectorAll('.tab');
const contents = document.querySelectorAll('.tab-content');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Tüm tabları temizle
        tabs.forEach(t => t.classList.remove('active'));
        contents.forEach(c => c.classList.remove('active'));

        // Tıklanan tabı aktif yap
        tab.classList.add('active');

        // Karşılık gelen içeriği göster
        const targetId = tab.getAttribute('data-tab');
        const targetContent = document.getElementById(targetId);

        if (targetContent) {
            targetContent.classList.add('active');
        }
    });
});

// =======================
// Açıklama toggle
const toggleBtn = document.getElementById("toggleDesc");
const descText = document.getElementById("descText");
if (toggleBtn && descText) {
  toggleBtn.addEventListener("click", function () {
    descText.classList.toggle("expanded");
    toggleBtn.innerText = descText.classList.contains("expanded") ? "Daha az göster" : "Daha fazla göster";
  });
}