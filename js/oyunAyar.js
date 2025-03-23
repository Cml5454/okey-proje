// Global veri yapısı
window.appData = {
    ayarlar: {},
    oyuncular: [],
    oyunTipi: "",
    katlar: {},
    tasRenkleri: {}
};

// Yardımcı fonksiyon – Belirli ID'li elementi gizler
function hideElement(id) {
    const el = document.getElementById(id);
    if (el) el.style.display = "none";
}

// Oyunculara rastgele renk atayan fonksiyon
function renkleriAta() {
    const renkSecenekleri = ["black",
        "#c0392b",
        "#2980b9",
        "#27ae60"]; // siyah, kırmızı, mavi, yeşil
    const oyuncuSayisi = window.appData.oyuncular.length;

    const atananRenkler = {};
    const secenekler = [...renkSecenekleri]; // kopyasını al

    for (let i = 0; i < oyuncuSayisi; i++) {
        // Renkleri sırayla veya rastgele dağıtmak istersen burada seçimi değiştirebilirsin
        const renk = secenekler[i % secenekler.length];
        atananRenkler[i + 1] = renk;
    }

    window.appData.tasRenkleri = atananRenkler;
}

const skorKayit = JSON.parse(localStorage.getItem("okeySkorVeri"));
if (skorKayit) {
  window.appData.skorlar = skorKayit.skorlar || {1:0, 2:0, 3:0, 4:0};
  window.appData.elSayisi = skorKayit.elSayisi || 1;
  window.appData.skorTablosu = skorKayit.tablo || [];
}

function oyunAyarlariniYukle() {
    const ayarlar = JSON.parse(localStorage.getItem("okeyAyarlar")) || {};
    const oyuncular = ayarlar.oyuncular || ["Player 1",
        "Player 2",
        "Player 3",
        "Player 4"];
    const oyunTipi = ayarlar.oyunTipi || "tekli";
    const katlar = ayarlar.katlar || {
        siyah: 10,
        kirmizi: 10,
        mavi: 20,
        sari: 20
    };

    // Global veri objesine aktarma
    window.appData.ayarlar = ayarlar;
    window.appData.oyuncular = oyuncular;
    window.appData.oyunTipi = oyunTipi;
    window.appData.katlar = katlar;

    // Oyuncu isimlerini masa üzerindeki yerlere yaz
    document.getElementById("oyuncu1-isim").innerText = oyuncular[0] || "Player 1";

    if (oyunTipi === "tekli") {
        document.getElementById("oyuncu2-isim").innerText = oyuncular[1] || "Player 2";
        document.getElementById("oyuncu3-isim").innerText = oyuncular[2] || "Player 3";
        document.getElementById("oyuncu4-isim").innerText = oyuncular[3] || "Player 4";
    } else {
        // Eşli oyun: sadece oyuncu 1 ve 3
        document.getElementById("oyuncu3-isim").innerText = oyuncular[1] || "Player 3";

        // Karşılıklı olmayan oyuncular ve taşları gizle
        hideElement("oyuncu2-isim");
        hideElement("oyuncu4-isim");
        hideElement("taslar2");
        hideElement("taslar4");
    }

    // Oyuncu taş renklerini ata
    renkleriAta(); 
    elBilgisiniGuncelle();
}
// El sayısını başlat
if (!window.appData.elSayisi) {
    window.appData.elSayisi = 1;
}

// El bilgisi güncelleme fonksiyonu
function elBilgisiniGuncelle() {
    const elDiv = document.getElementById("elBilgisi");
    if (elDiv) {
        elDiv.innerText = `${window.appData.elSayisi}. El Oynanıyor`;
    }
}

// Sayfa ilk açıldığında göster
document.addEventListener("DOMContentLoaded", () => {
    elBilgisiniGuncelle();
});