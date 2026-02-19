// script.js - Güncellenmiş Üst Kısım

const slides = ["ps5-1.jpg", "ps5-2.jpg", "ps5-3.jpg"];
const slider = document.getElementById("slider");
const indicator = document.querySelector(".photo-indicator");

if (slider) {
    slider.innerHTML = slides.map(src => `<img src="${src}" class="slide">`).join('');
    slider.addEventListener("scroll", () => {
        const index = Math.round(slider.scrollLeft / slider.offsetWidth);
        if (indicator) indicator.textContent = `${index + 1} / ${slides.length}`;
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

// TAB SİSTEMİ - KESİN ÇÖZÜM
const tabs = document.querySelectorAll('.tab');
const contents = document.querySelectorAll('.tab-content');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const targetId = tab.getAttribute('data-tab');
        
        tabs.forEach(t => t.classList.remove('active'));
        contents.forEach(c => c.classList.remove('active'));

        tab.classList.add('active');
        const targetContent = document.getElementById(targetId);
        if (targetContent) targetContent.classList.add('active');
    });
});



// AÇIKLAMA TOGGLE
const toggleBtn = document.getElementById("toggleDesc");
const descText = document.getElementById("descText");
if (toggleBtn && descText) {
  toggleBtn.addEventListener("click", function () {
    descText.classList.toggle("expanded");
    toggleBtn.innerText = descText.classList.contains("expanded") ? "Daha az göster" : "Daha fazla göster";
  });
}
