function sayiGirisiBaslat(playerId, renk, islemTipi) {
  const app = window.appData || {};
  const oyuncular = app.oyuncular || ["Oyuncu 1", "Oyuncu 2", "Oyuncu 3", "Oyuncu 4"];
  const oyunTipi = app.oyunTipi || "tekli";

  const modal = document.createElement("div");
  modal.className = "modal";
  modal.id = "sayiModal";

  const content = document.createElement("div");
  content.className = "modal-content sayi-modal-content";

  // Başlık ve kapatma simgesi
  const header = document.createElement("div");
  header.style.display = "flex";
  header.style.justifyContent = "space-between";
  header.style.alignItems = "center";

  const title = document.createElement("h3");
  title.innerText = "Oyuncuların Elindeki Sayılar";

  const closeBtn = document.createElement("span");
  closeBtn.innerHTML = "&times;";
  closeBtn.style.cursor = "pointer";
  closeBtn.style.fontSize = "22px";
  closeBtn.onclick = () => kapatSayiModal();

  header.appendChild(title);
  header.appendChild(closeBtn);
  content.appendChild(header);

  const inputlar = {};
  const hedefler = [];

  // Hedef oyuncuları belirle
  if (oyunTipi === "tekli") {
    for (let i = 1; i <= 4; i++) {
      if (i !== playerId) hedefler.push(i);
    }
  } else {
    if (playerId === 1) hedefler.push(3);
    else if (playerId === 3) hedefler.push(1);
    else {
      alert("Eşli oyunda yalnızca Oyuncu 1 veya 3 bitiş başlatabilir.");
      return;
    }
  }

  // Giriş alanlarını oluştur
  hedefler.forEach(id => {
    const group = document.createElement("div");
    group.className = "input-group";

    const oyuncuIsmi = (oyunTipi === "esli")
      ? (id === 1 ? oyuncular[0] : oyuncular[1])
      : oyuncular[id - 1] || `Oyuncu ${id}`;

    const label = document.createElement("label");
    label.innerText = `${oyuncuIsmi} elindeki sayı:`;

    const input = document.createElement("input");
    input.type = "number";
    input.min = 0;
    input.placeholder = "Örn: 26";
    input.className = "sayi-input";

    inputlar[id] = input;
    group.appendChild(label);
    group.appendChild(input);
    content.appendChild(group);
  });

  // Onay butonu
  const onayBtn = document.createElement("button");
  onayBtn.innerText = "Giriş";
  onayBtn.className = "btn-giris";
  onayBtn.onclick = () => {
    const sayilar = {};
    let eksik = false;

    hedefler.forEach(id => {
      const deger = parseInt(inputlar[id].value);
      if (isNaN(deger)) eksik = true;
      else sayilar[id] = deger;
    });

    if (eksik) {
      alert("Lütfen tüm sayıları giriniz.");
      return;
    }

    kapatSayiModal();
    skorHesapla(playerId, renk, islemTipi, sayilar);
  };

  content.appendChild(onayBtn);
  modal.appendChild(content);
  document.body.appendChild(modal);
  modal.style.display = "flex";
}

// Yardımcı fonksiyon: Sayı modalini kapat
function kapatSayiModal() {
  const modal = document.getElementById("sayiModal");
  if (modal) modal.remove();
}