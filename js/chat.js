import { auth, db } from "./firebase.js";
import {
  signInAnonymously,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {
  collection,
  doc,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const messagesEl = document.getElementById("messages");
const form = document.getElementById("sendForm");
const input = document.getElementById("messageInput");

let currentUser = null;
const targetUid = "USER_B_UID"; // 🔴 thay UID người B bạn muốn chat

function getChatId(uid1, uid2) {
  return [uid1, uid2].sort().join("_");
}

function startChat(uidA, uidB) {
  const chatId = getChatId(uidA, uidB);
  const msgRef = collection(db, "chats", chatId, "messages");
  const q = query(msgRef, orderBy("createdAt", "asc"));

  onSnapshot(q, (snapshot) => {
    messagesEl.innerHTML = "";
    snapshot.forEach(doc => {
      const data = doc.data();
      const div = document.createElement("div");
      div.textContent = `${data.uid}: ${data.text}`;
      messagesEl.appendChild(div);
    });
  });

  form.onsubmit = async (e) => {
    e.preventDefault();
    if (!input.value.trim()) return;
    await addDoc(msgRef, {
      uid: uidA,
      text: input.value,
      createdAt: serverTimestamp()
    });
    input.value = "";
  };
}

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    await signInAnonymously(auth);
  } else {
    currentUser = user;
    console.log("Signed in:", user.uid);
    startChat(user.uid, targetUid);
  }
});
