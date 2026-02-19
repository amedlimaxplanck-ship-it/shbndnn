// script.js - sadece eksik işlevleri düzeltiyorum, diğer kodların bozulmasın

// =======================
// Favlama (sarı toggle, sessiz, içi dolu kalıyor başlangıçta)
const favStar = document.getElementById("favStar");
if (favStar) {
    let isFavorite = localStorage.getItem("fav_ps5") === "true";
    if (isFavorite) favStar.classList.add("fas");

    favStar.addEventListener("click", () => {
        isFavorite = !isFavorite;
        if (isFavorite) {
            favStar.classList.add("fas");
        } else {
            favStar.classList.remove("fas");
        }
        localStorage.setItem("fav_ps5", isFavorite);
        // Hiç alert/yazı çıkmıyor, sadece sarıya dönüyor
    });
}

// =======================
// Share butonu (senin SVG'li butonun)
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

// =======================
// Açıklama toggle (zaten var, çalışsın diye tekrar ekliyorum)
const toggleBtn = document.getElementById("toggleDesc");
const descText = document.getElementById("descText");
if (toggleBtn && descText) {
    toggleBtn.addEventListener("click", function () {
        descText.classList.toggle("expanded");
        toggleBtn.innerText = descText.classList.contains("expanded") ? "Daha az göster" : "Daha fazla göster";
    });
}

// =======================
// Thumbnail + Zoom (senin slider yerine daha iyi çalışıyor)
const slider = document.getElementById("slider");
const photoIndicator = document.getElementById("photoIndicator");
if (slider) {
    slider.innerHTML = `
        <img src="resimler/ps5-1.jpg" class="slide">
        <img src="resimler/ps5-2.jpg" class="slide">
        <img src="resimler/ps5-3.jpg" class="slide">
    `;
    slider.addEventListener("scroll", () => {
        const index = Math.round(slider.scrollLeft / slider.clientWidth);
        photoIndicator.textContent = `${index + 1} / 3`;
    });
}

// Ana resme tıklayınca zoom
const mainPhoto = document.querySelector(".main-photo");
if (mainPhoto) {
    mainPhoto.onclick = () => {
        document.getElementById('zoomedPhoto').src = mainPhoto.src;
        document.getElementById('zoomModal').style.display = 'block';
    };
}
document.getElementById('closeModal').onclick = () => {
    document.getElementById('zoomModal').style.display = 'none';
};