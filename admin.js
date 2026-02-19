// admin.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc, collection, query, orderBy, getDocs } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-storage.js";

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
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// LOGIN
window.login = async function() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    await signInWithEmailAndPassword(auth, email, password);
    alert("Giriş başarılı ✅");
  } catch(err) {
    let msg = "Giriş başarısız ❌";
    switch(err.code) {
      case "auth/wrong-password": msg = "Şifre yanlış ❌"; break;
      case "auth/user-not-found": msg = "Kullanıcı bulunamadı ❌"; break;
      case "auth/invalid-email": msg = "Email geçersiz ❌"; break;
    }
    alert(msg);
  }
}

// LOGOUT
window.logout = async function() {
  await signOut(auth);
}

// OnAuthStateChanged
onAuthStateChanged(auth, async (user) => {
  if (user) {
    document.getElementById("loginArea").style.display = "none";
    document.getElementById("panel").style.display = "block";
    document.getElementById("logoutBtn").style.display = "inline-block";

    await loadAd();
    await loadMessages();
  } else {
    document.getElementById("loginArea").style.display = "block";
    document.getElementById("panel").style.display = "none";
    document.getElementById("logoutBtn").style.display = "none";
  }
});

// İLAN VERİLERİ
async function loadAd() {
  const docRef = doc(db, "ilan", "ilan1");
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const data = docSnap.data();
    document.getElementById("title").value = data.title || "";
    document.getElementById("price").value = data.price || "";
    document.getElementById("description").value = data.description || "";
  }
}

// İLAN KAYDETME
window.saveAd = async function() {
  const title = document.getElementById("title").value;
  const price = document.getElementById("price").value;
  const description = document.getElementById("description").value;
  const file = document.getElementById("image").files[0];

  let imageUrl = "";

  if (file) {
    const storageRef = ref(storage, `ilanlar/${file.name}`);
    await uploadBytes(storageRef, file);
    imageUrl = await getDownloadURL(storageRef);
  }

  await setDoc(doc(db, "ilan", "ilan1"), {
    title,
    price,
    description,
    imageUrl
  });

  alert("İlan güncellendi ✅");
}

// MESAJLARI ÇEKME
async function loadMessages() {
  const messagesDiv = document.getElementById("messages");
  messagesDiv.innerHTML = "";

  const q = query(collection(db, "mesajlar"), orderBy("tarih", "desc"));
  const querySnapshot = await getDocs(q);

  querySnapshot.forEach(docSnap => {
    const data = docSnap.data();
    const msgDiv = document.createElement("div");
    msgDiv.classList.add("message");
    msgDiv.innerHTML = `
      <strong>${data.ad}</strong> (${data.telefon})<br>
      ${data.mesaj}<br>
      <small>${data.tarih?.toDate().toLocaleString() || ""}</small>
    `;
    messagesDiv.appendChild(msgDiv);
  });
}