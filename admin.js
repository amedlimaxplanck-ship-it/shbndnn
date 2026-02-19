import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyD-yn67AhKbiTExyrffBok2nthXhV_hL88",
  authDomain: "shbndn-12640.firebaseapp.com",
  projectId: "shbndn-12640",
  storageBucket: "shbndn-12640.firebasestorage.app",
  messagingSenderId: "579355427179",
  appId: "1:579355427179:web:2e7fafee98f9a7da2d0c2e",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

window.login = async function() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  await signInWithEmailAndPassword(auth, email, password);
}

window.logout = async function() {
  await signOut(auth);
}

onAuthStateChanged(auth, (user) => {
  if (user) {
    document.getElementById("loginArea").style.display = "none";
    document.getElementById("panel").style.display = "block";
    loadAd();
  } else {
    document.getElementById("loginArea").style.display = "block";
    document.getElementById("panel").style.display = "none";
  }
});

async function loadAd() {
  const docRef = doc(db, "ilan", "ilan1");
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const data = docSnap.data();
    document.getElementById("title").value = data.title;
    document.getElementById("price").value = data.price;
    document.getElementById("description").value = data.description;
  }
}

window.saveAd = async function() {
  const title = document.getElementById("title").value;
  const price = document.getElementById("price").value;
  const description = document.getElementById("description").value;
  const file = document.getElementById("image").files[0];

  let imageUrl = "";

  if (file) {
    const storageRef = ref(storage, "ilan.jpg");
    await uploadBytes(storageRef, file);
    imageUrl = await getDownloadURL(storageRef);
  }

  await setDoc(doc(db, "ilan", "ilan1"), {
    title,
    price,
    description,
    imageUrl
  });

  alert("İlan güncellendi!");
}

// Mesajları listeleme
async function loadMessages() {
  const messagesDiv = document.getElementById("messages");
  messagesDiv.innerHTML = "";

  const querySnapshot = await db.collection("mesajlar").orderBy("tarih","desc").get();
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

// onAuthStateChanged içine ekle
onAuthStateChanged(auth, (user) => {
  if (user) {
    document.getElementById("loginArea").style.display = "none";
    document.getElementById("panel").style.display = "block";
    document.getElementById("logoutBtn").style.display = "inline-block";
    loadAd();
    loadMessages();
  } else {
    document.getElementById("loginArea").style.display = "block";
    document.getElementById("panel").style.display = "none";
    document.getElementById("logoutBtn").style.display = "none";
  }
});