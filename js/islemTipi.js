function islemTipiSec(playerId, renk) {
  // Modal ana yapısı
  const modal = document.createElement("div");
  modal.className = "modal";
  modal.id = "islemModal";

  const content = document.createElement("div");
  content.className = "modal-content";

  const title = document.createElement("h3");
  title.innerText = "İşlem Tipi Seç";
  content.appendChild(title);

  // Seçilebilir işlem tipleri
  const tipler = [
    { label: "Normal Bitiş", value: "normal" },
    { label: "Okey", value: "okey" },
    { label: "Ceza", value: "ceza" }
  ];

  tipler.forEach(tip => {
    const btn = document.createElement("button");
    btn.innerText = tip.label;
    btn.className = "renk-btn";
    btn.style.backgroundColor = "#34495e";
    btn.style.margin = "10px";

    btn.onclick = () => {
      modal.remove();

      if (tip.value === "ceza") {
        // Ceza: doğrudan oyuncuya ceza puanı eklenir
        skorHesapla(playerId, renk, "ceza", {});
      } else {
        // Diğerleri için sayı girişi modali açılır
        sayiGirisiBaslat(playerId, renk, tip.value);
      }
    };

    content.appendChild(btn);
  });

  // İptal butonu
  const iptalBtn = document.createElement("button");
  iptalBtn.innerText = "İptal";
  iptalBtn.className = "btn-giris";
  iptalBtn.style.marginTop = "16px";
  iptalBtn.onclick = () => modal.remove();
  content.appendChild(iptalBtn);

  // Modal'ı sayfaya ekle ve göster
  modal.appendChild(content);
  document.body.appendChild(modal);
  modal.style.display = "flex";
}