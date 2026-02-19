// script.js - Senin istediğin gibi düzeltilmiş hali

// =======================
// Resimler (aynı klasörde olduğu için direkt isim)
const slides = ["ps5-1.jpg", "ps5-2.jpg", "ps5-3.jpg"];

// Slider + Indicator
const slider = document.getElementById("slider");
const photoIndicator = document.getElementById("photoIndicator");

if (slider) {
  slider.innerHTML = "";
  slides.forEach(src => {
    const img = document.createElement("img");
    img.src = src;
    img.className = "slide";
    slider.appendChild(img);
  });

  slider.addEventListener("scroll", () => {
    const index = Math.round(slider.scrollLeft / slider.clientWidth);
    if (photoIndicator) photoIndicator.textContent = `${index + 1} / ${slides.length}`;
  });
}

// =======================
// Favlama - İçi dolu beyaz yıldız, tıklayınca sarı, tekrar tıklayınca beyaz
const favStar = document.getElementById("favStar");
if (favStar) {
  let isFavorite = localStorage.getItem("fav_ps5") === "true";
  if (isFavorite) {
    favStar.style.color = "#ffc107"; // sarı
  } else {
    favStar.style.color = "#ffffff"; // beyaz dolu
  }

  favStar.addEventListener("click", () => {
    isFavorite = !isFavorite;
    if (isFavorite) {
      favStar.style.color = "#ffc107"; // sarı
    } else {
      favStar.style.color = "#ffffff"; // beyaz dolu
    }
    localStorage.setItem("fav_ps5", isFavorite);
  });
}

// =======================
// Share butonu (senin SVG'li hali)
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
// Tab sistemi (İlan Bilgileri / Konumu)
const tabs = document.querySelectorAll('.tab');
const contents = document.querySelectorAll('.tab-content');
tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    contents.forEach(c => c.classList.remove('active'));
    tab.classList.add('active');
    const target = document.getElementById(tab.dataset.tab);
    if (target) target.classList.add('active');
  });
});

// Açıklama toggle
const toggleBtn = document.getElementById("toggleDesc");
const descText = document.getElementById("descText");
if (toggleBtn && descText) {
  toggleBtn.addEventListener("click", function () {
    descText.classList.toggle("expanded");
    toggleBtn.innerText = descText.classList.contains("expanded") ? "Daha az göster" : "Daha fazla göster";
  });
}