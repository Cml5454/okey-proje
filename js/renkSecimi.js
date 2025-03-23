function renkSecimiAc(playerId) {
  const modal = document.getElementById("renkModal");
  const renkContainer = document.getElementById("renkSecenekleri");

  // Önceki seçenekleri temizle
  renkContainer.innerHTML = "";

  // Kat çarpanlarını al
  const katlar = window.appData.katlar || {
    siyah: 10,
    kirmizi: 10,
    mavi: 20,
    sari: 20
  };

  const renkler = ['siyah', 'kirmizi', 'mavi', 'sari'];

  // Her renk için buton oluştur
  renkler.forEach(renk => {
    const btn = document.createElement("button");
    btn.className = `renk-btn ${renk}`;
    btn.innerText = `${renk.charAt(0).toUpperCase() + renk.slice(1)} (x${katlar[renk]})`;
    btn.onclick = () => {
      modal.style.display = "none";
      islemTipiSec(playerId, renk);
    };
    renkContainer.appendChild(btn);
  });

  // Modal'ı göster
  modal.style.display = "flex";
}

function kapatModal() {
  const modal = document.getElementById("renkModal");
  if (modal) {
    modal.style.display = "none";
  }
}