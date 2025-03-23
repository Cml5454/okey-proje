// Skor tablosu veri yapısı yoksa başlat
if (!window.appData.skorTablosu) {
    window.appData.skorTablosu = [];
}

// Her el sonunda tabloya satır ekler
function tabloKaydiEkle(renk, islemTipi, sayilar, bitirenId) {
    const skorlar = {};
    const kat = window.appData.katlar[renk] || 10;

    for (let i = 1; i <= 4; i++) {
        if (i === bitirenId) {
            skorlar[i] = "-";
        } else if (sayilar[i] !== undefined) {
            const ceza = (islemTipi === "okey") ? sayilar[i] * kat * 2: sayilar[i] * kat;
            skorlar[i] = ceza;
        } else {
            skorlar[i] = "";
        }
    }

    window.appData.skorTablosu.push({
        renk,
        islemTipi,
        skorlar
    });
}

// Skor tablosunu modal olarak açar
function skorTablosunuGoster(kazananGoster = false) {
    const skorlar = window.appData?.skorlar || {};
    const tabloData = window.appData?.skorTablosu || [];
    const oyunTipi = window.appData?.oyunTipi || "tekli";
    const oyuncular = window.appData?.oyuncular || [];

    const aktifOyuncular = (oyunTipi === "esli") ? [1,
        3]: [1,
        2,
        3,
        4];

    // Kazananı hesapla (en düşük puanı alan)
    let kazananHTML = "";
    if (kazananGoster) {
        let minPuan = Infinity;
        let kazananId = null;
        aktifOyuncular.forEach(id => {
            const puan = skorlar[id];
            if (puan < minPuan) {
                minPuan = puan;
                kazananId = id;
            }
        });

        const kazananIsim = oyuncular[kazananId - 1] || `Player ${kazananId}`;
        kazananHTML = `<div class="kazanan-banner">Kazanan: ${kazananIsim}</div>`;
    }

    let tabloHTML = `<div class="skor-tablosu-container">`;

    if (kazananHTML) {
        tabloHTML += kazananHTML;
    }

    tabloHTML += `<table class="skor-tablosu"><thead><tr>`;
    aktifOyuncular.forEach(id => {
        tabloHTML += `<th>${oyuncular[id - 1] || `Player ${id}`}</th>`;
    });
    tabloHTML += `</tr></thead><tbody>`;

    tabloData.forEach(kayit => {
        tabloHTML += `<tr>`;
        aktifOyuncular.forEach(id => {
            const deger = kayit.skorlar[id];
            const renk = kayit.renk;
            const arkaPlan = (deger !== "" && deger !== undefined) ? `style="background-color: var(--${renk})"`: "";
            tabloHTML += `<td ${arkaPlan}>${deger}</td>`;
        });
        tabloHTML += `</tr>`;
    });

    // Toplam satırı
    tabloHTML += `<tr class="toplam-satiri">`;
    aktifOyuncular.forEach(id => {
        tabloHTML += `<td><strong>${skorlar[id] || 0}</strong></td>`;
    });
    tabloHTML += `</tr>`;

    tabloHTML += `</tbody></table><button class="btn-kapat" onclick="kapatSkorTablosu()">Kapat</button></div>`;

    const modal = document.createElement("div");
    modal.id = "skorTabloModal";
    modal.className = "modal";
    modal.innerHTML = `<div class="modal-content">${tabloHTML}</div>`;

    document.body.appendChild(modal);
    modal.style.display = "flex";
}
// Skor tablosu modalını kapatır
function kapatSkorTablosu() {
    const modal = document.getElementById("skorTabloModal");
    if (modal) modal.remove();
}
