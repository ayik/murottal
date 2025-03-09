const audioPlayer = document.getElementById("audioPlayer");
const progressBar = document.getElementById("progressBar");
const currentTimeDisplay = document.getElementById("currentTime");
const durationDisplay = document.getElementById("duration");
const juzSelect = document.getElementById("juz");

// Generate Juz options dynamically
for (let i = 1; i <= 30; i++) {
    let option = document.createElement("option");
    option.value = i;
    option.textContent = `Juz ${i}`;
    juzSelect.appendChild(option);
}

function playAudio() {
    const qari = document.getElementById("qari").value;
    const juz = document.getElementById("juz").value.padStart(2, '0');

    let audioUrl = "";
    if (qari === "mishary") {
        audioUrl = `https://ia801804.us.archive.org/11/items/MisharyRasyidPerJuz/Mishary/${juz}.mp3`;
    } else if (qari === "sudais") {
        audioUrl = `https://ia800803.us.archive.org/26/items/AbdurrahmanSudaisPerJuz/${juz}.mp3`;
    } else if (qari === "dosari") {
        audioUrl = `https://ia903203.us.archive.org/26/items/YasserAlDosariPerJuz/${juz}.mp3`;
    } else if (qari === "Shuraim") {
        audioUrl = `https://ia803208.us.archive.org/20/items/SaudAlShuraimPerJuz/${juz}.mp3`;
    } else if (qari === "SaadAl-Ghamidi") {
        audioUrl = `https://ia803200.us.archive.org/20/items/SaadAl-GhamidiPerJuz/${juz}.mp3`;
    } else if (qari === "HanyAr-Rifai") {
        audioUrl = `https://ia800500.us.archive.org/17/items/HanyAr-RifaiPerJuz/${juz}.mp3`;
    }

    audioPlayer.src = audioUrl;
    audioPlayer.play();

    // Auto Play Juz Berikutnya
    audioPlayer.onended = function() {
        let nextJuz = parseInt(juz) + 1;
        if (nextJuz <= 30) {
            document.getElementById("juz").value = nextJuz;
            playAudio();
        }
    };
}

// Update progress bar setiap detik
audioPlayer.ontimeupdate = function() {
    const percentage = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    progressBar.style.width = percentage + "%";
    currentTimeDisplay.textContent = formatTime(audioPlayer.currentTime);
    durationDisplay.textContent = formatTime(audioPlayer.duration);
};

// Fungsi untuk lompat ke menit tertentu
function seekAudio(event) {
    const progressContainer = document.querySelector(".progress-container");
    const clickPosition = event.offsetX / progressContainer.offsetWidth;
    audioPlayer.currentTime = clickPosition * audioPlayer.duration;
}

// Format waktu ke menit:detik
function formatTime(seconds) {
    if (isNaN(seconds)) return "00:00";
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}
