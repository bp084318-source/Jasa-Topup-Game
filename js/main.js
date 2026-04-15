const fileInput = document.getElementById("imageUpload");
const preview = document.getElementById("preview");

let lastSearchOpened = false;

// preview gambar
fileInput.addEventListener("change", function () {
  const file = this.files[0];

  if (file) {
    preview.src = URL.createObjectURL(file);
    preview.style.display = "block";
  }
});

window.startScan = function () {
  const status = document.getElementById("scanStatus");
  const progress = document.getElementById("progress");
  const resultBox = document.getElementById("resultBox");
  const resultText = document.getElementById("resultText");

  if (!fileInput.files.length) {
    status.innerText = "❌ Upload foto dulu";
    return;
  }

  let percent = 0;

  const messages = [
    "🔍 Menganalisis gambar...",
    "🧠 Mencocokkan pola visual...",
    "🌐 Mengakses database global...",
    "⚡ Menyusun hasil..."
  ];

  let step = 0;

  const interval = setInterval(() => {
    percent += 10;
    progress.style.width = percent + "%";

    if (percent % 30 === 0 && step < messages.length) {
      status.innerText = messages[step];
      step++;
    }

    if (percent >= 100) {
      clearInterval(interval);

      status.innerText = "🚀 Mengirim ke Google Images...";

      setTimeout(() => {
        document.getElementById("realSubmit").click();
        lastSearchOpened = true;

        // tampilkan hasil simulasi
        setTimeout(() => {
          resultBox.style.display = "block";

          const random = Math.random();

          if (random > 0.5) {
            resultText.innerText =
              "🔴 Kemungkinan ditemukan gambar serupa di internet. Disarankan cek detail.";
          } else {
            resultText.innerText =
              "🟢 Tidak ditemukan indikasi kuat penyebaran luas.";
          }

          clearUserData();
        }, 1500);

      }, 1000);
    }
  }, 300);
};

// buka hasil lagi
window.openResult = function () {
  if (lastSearchOpened) {
    window.open("https://images.google.com/", "_blank");
  }
};

// hapus data user
function clearUserData() {
  fileInput.value = "";
  preview.src = "";
  preview.style.display = "none";

  document.getElementById("scanStatus").innerText =
    "🧹 Data dibersihkan demi keamanan";

  document.getElementById("progress").style.width = "0%";
}
