function guncelleOyuncular() {
  const tip = document.getElementById('oyunTipi').value;
  const oyuncuIsimleri = document.getElementById('oyuncuIsimleri');
  const katlar = document.getElementById('katlar');
  const baslatBtn = document.getElementById('baslatBtn');

  if (!tip) {
    oyuncuIsimleri.classList.add('hidden');
    katlar.classList.add('hidden');
    baslatBtn.classList.add('hidden');
    return;
  }

  oyuncuIsimleri.classList.remove('hidden');
  katlar.classList.remove('hidden');
  baslatBtn.classList.remove('hidden');

  if (tip === "esli") {
    // Eşli oyun: sadece Player 1 ve Player 3 aktif
    document.getElementById('player1Row').classList.remove('hidden');
    document.getElementById('player3Row').classList.remove('hidden');
    document.getElementById('player2Row').classList.add('hidden');
    document.getElementById('player4Row').classList.add('hidden');
  } else {
    // Tekli oyun: tüm oyuncular aktif
    document.getElementById('player1Row').classList.remove('hidden');
    document.getElementById('player2Row').classList.remove('hidden');
    document.getElementById('player3Row').classList.remove('hidden');
    document.getElementById('player4Row').classList.remove('hidden');
  }
}

function baslat() {
  const oyunTipi = document.getElementById('oyunTipi').value;

  let oyuncular = [];

  if (oyunTipi === "esli") {
    // Sadece 1 ve 3. oyuncular
    oyuncular = [
      document.getElementById('player1').value || "Oyuncu 1",
      document.getElementById('player3').value || "Oyuncu 3"
    ];
  } else {
    // Tüm oyuncular
    oyuncular = [
      document.getElementById('player1').value || "Oyuncu 1",
      document.getElementById('player2').value || "Oyuncu 2",
      document.getElementById('player3').value || "Oyuncu 3",
      document.getElementById('player4').value || "Oyuncu 4"
    ];
  }

  const katlar = {
    siyah: parseInt(document.getElementById('kat_siyah').value) || 10,
    kirmizi: parseInt(document.getElementById('kat_kirmizi').value) || 10,
    mavi: parseInt(document.getElementById('kat_mavi').value) || 20,
    sari: parseInt(document.getElementById('kat_sari').value) || 20
  };

  const ayarlar = { oyunTipi, oyuncular, katlar };
  localStorage.setItem("okeyAyarlar", JSON.stringify(ayarlar));
  window.location.href = "masa.html";
}