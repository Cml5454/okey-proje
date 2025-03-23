// Global skor yapısı yoksa başlat
if (!window.appData.skorlar) {
  window.appData.skorlar = {
    1: 0,
    2: 0,
    3: 0,
    4: 0
  };
}

// El sayısı yoksa başlat
if (!window.appData.elSayisi) {
  window.appData.elSayisi = 1;
}

function skorHesapla(playerId, renk, islemTipi, sayilar = {}) {
  // El sınırı kontrolü
  if (window.appData.elSayisi > 11) {
    alert("Oyun tamamlandı. 11 el oynandı.");
    skorTablosunuGoster(true); // Kazananı göstererek tabloyu aç
    return;
  }

  const kat = window.appData.katlar[renk] || 10;
  const skorlar = window.appData.skorlar;

  switch (islemTipi) {
    case "normal": {
      const elSayisi = sayilar[playerId] || 0;
      skorlar[playerId] -= kat * elSayisi;

      Object.entries(sayilar).forEach(([id, sayi]) => {
        const hedefId = parseInt(id);
        if (hedefId !== playerId) {
          skorlar[hedefId] += sayi * kat;
        }
      });
      break;
    }

    case "okey": {
      skorlar[playerId] -= kat * 100;

      Object.entries(sayilar).forEach(([id, sayi]) => {
        const hedefId = parseInt(id);
        if (hedefId !== playerId) {
          skorlar[hedefId] += sayi * kat * 2;
        }
      });
      break;
    }

    case "ceza": {
      skorlar[playerId] += kat * 100;
      break;
    }
  }

  // Ceza dışı oyunlar tabloya eklensin ve el numarası artırılsın
  if (islemTipi !== "ceza") {
    tabloKaydiEkle(renk, islemTipi, sayilar, playerId);
    window.appData.elSayisi++;
    elBilgisiniGuncelle();
  }

  // Skorları ekrana taşlarla yaz
  Object.entries(skorlar).forEach(([id, skor]) => {
    taslariYaz(parseInt(id), skor);
  });

  // Oyun verilerini localStorage'a kaydet
  localStorage.setItem("okeySkorVeri", JSON.stringify({
    skorlar: window.appData.skorlar,
    elSayisi: window.appData.elSayisi,
    tablo: window.appData.skorTablosu
  }));

  console.log("Güncel skorlar:", skorlar);

  // Oyun tamamlandıysa tabloyu otomatik göster
  if (window.appData.elSayisi > 11) {
    setTimeout(() => {
      skorTablosunuGoster(true); // Kazananı da göster
    }, 500);
  }
}