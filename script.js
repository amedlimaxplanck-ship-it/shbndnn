// script.js

// Thumbnail'ları doldur + tıklama + indicator
const thumbnails = document.getElementById('thumbnails');
const mainPhoto = document.getElementById('mainPhoto');
const photoIndicator = document.getElementById('photoIndicator');
const resimler = ["ps5-1.jpg", "ps5-2.jpg", "ps5-3.jpg"];

if (thumbnails && mainPhoto && resimler.length > 0) {
    mainPhoto.src = resimler[0];
    resimler.forEach((src, index) => {
        const img = document.createElement('img');
        img.src = src;
        img.className = 'thumb' + (index === 0 ? ' active' : '');
        img.onclick = () => {
            mainPhoto.src = src;
            document.querySelectorAll('.thumb').forEach(t => t.classList.remove('active'));
            img.classList.add('active');
            photoIndicator.textContent = `${index + 1} / ${resimler.length}`;
        };
        thumbnails.appendChild(img);
    });
}

// Ana resim tıklayınca zoom
if (mainPhoto) {
    mainPhoto.onclick = () => {
        document.getElementById('zoomedPhoto').src = mainPhoto.src;
        document.getElementById('zoomModal').style.display = 'block';
    };
}
document.getElementById('closeModal').onclick = () => {
    document.getElementById('zoomModal').style.display = 'none';
};

// Favlama (sarı toggle, sessiz)
const favStar = document.getElementById('favStar');
if (favStar) {
    const isFav = localStorage.getItem('fav_ps5') === 'true';
    if (isFav) favStar.classList.add('fas');

    favStar.onclick = () => {
        favStar.classList.toggle('fas');
        localStorage.setItem('fav_ps5', favStar.classList.contains('fas'));
    };
}

// Share butonu
const shareBtn = document.getElementById('shareBtn');
if (shareBtn) {
    shareBtn.onclick = () => {
        const shareData = {
            title: 'PS5 DİJİTAL SLİM - 23.999 TL',
            text: 'İstanbul / Kadıköy - Detaylar için bakın!',
            url: window.location.href
        };
        if (navigator.share) {
            navigator.share(shareData).catch(() => {});
        } else {
            alert('Link kopyalandı: ' + window.location.href);
        }
    };
}

// Tab sistemi
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

// Açıklama toggle
const toggleBtn = document.getElementById("toggleDesc");
const descText = document.getElementById("descText");
if (toggleBtn && descText) {
    toggleBtn.addEventListener("click", () => {
        descText.classList.toggle("expanded");
        toggleBtn.innerText = descText.classList.contains("expanded") ? "Daha az göster" : "Daha fazla göster";
    });
}

// Fade-up efekti
const faders = document.querySelectorAll(".fade-up");
const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });
faders.forEach(fader => appearOnScroll.observe(fader));