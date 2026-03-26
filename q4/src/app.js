// CYSE 411 Exam Application
// WARNING: This code contains security vulnerabilities.
// Students must repair the implementation.

const loadBtn = document.getElementById("loadBtn");
const saveBtn = document.getElementById("saveSession");
const loadSessionBtn = document.getElementById("loadSession");

loadBtn.addEventListener("click", loadProfile);
saveBtn.addEventListener("click", saveSession);
loadSessionBtn.addEventListener("click", loadSession);

let currentProfile = null;


/* -------------------------
   Load Profile
-------------------------- */

function loadProfile() {

    const text = document.getElementById("profileInput").value;
    try {
        JSON.parse(text);
    } catch (error) {
        alert("Invalid profile format");
        return;
    }
   
    const profile = JSON.parse(text);

    currentProfile = profile;

    renderProfile(profile);
}


/* -------------------------
   Render Profile
-------------------------- */

function renderProfile(profile) {

    
    document.getElementById("username").textContent = profile.username;

    const list = document.getElementById("notifications");
    list.innerHTML = "";

    for (let n of profile.notifications) {
        const item = document.createElement("li");
        item.textContent = n;
        list.appendChild(item);
    }
}


/* -------------------------
   Browser Storage
-------------------------- */

function saveSession() {
    if (!currentProfile) {
        alert("No profile loaded");
        return;
    }

    localStorage.setItem("profile", JSON.stringify(currentProfile));
    alert("Session saved");
}


function loadSession() {

    const stored = localStorage.getItem("profile");

    if (stored) {
        const profile = JSON.parse(stored);
        currentProfile = profile;
        renderProfile(profile);
    }
}
