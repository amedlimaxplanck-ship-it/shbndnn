// script.js

// Resimler (senin klasöründeki 3 tane)
const resimler = [
    "resimler/ps5-1.jpg",
    "resimler/ps5-2.jpg",
    "resimler/ps5-3.jpg"
];

const slider = document.getElementById("slider");
const slides = document.querySelectorAll(".slide");
const indicator = document.getElementById("photoIndicator");

if (slider && indicator) {
    slider.addEventListener("scroll", () => {
        const index = Math.round(slider.scrollLeft / slider.clientWidth);
        indicator.textContent = `${index + 1} / ${slides.length}`;
    });
}

const favStar = document.getElementById("favStar");

if (favStar) {
    favStar.addEventListener("click", () => {
        favStar.classList.toggle("active");
    });
}






// Paylaş ikon (esnek popup)
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
            alert('Link: ' + window.location.href);
        }
    });
}

// ayrı bi dava 

const faders = document.querySelectorAll(".fade-up");

const appearOptions = {
    threshold: 0.2
};

const appearOnScroll = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
    });
}, appearOptions);

faders.forEach(fader => {
    appearOnScroll.observe(fader);
});

// Tab geçiş sistemi
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

const copyBtn = document.getElementById("copyIbanBtn");

if (copyBtn) {
    copyBtn.addEventListener("click", function () {
        const ibanText = document.getElementById("ibanText").innerText;

        navigator.clipboard.writeText(ibanText).then(() => {
            copyBtn.innerText = "Kopyalandı ✓";

            setTimeout(() => {
                copyBtn.innerText = "Kopyala";
            }, 2000);
        });
    });
}


// Açıklama toggle
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