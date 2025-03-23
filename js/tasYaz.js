function taslariYaz(playerId, skor) {
  const tasContainer = document.getElementById(`taslar${playerId}`);
  if (!tasContainer) return;

  // Eski taşları temizle
  tasContainer.innerHTML = "";

  // Skoru karakterlerine ayır
  const karakterler = skor.toString().split("");

  // Oyuncuya atanmış renk (kalp + rakam için)
  const renk = window.appData.tasRenkleri[playerId] || "black";

  // Her karakter için taş oluştur
  karakterler.forEach(char => {
    const tas = document.createElement("div");
    tas.className = "tas";

    const rakamDiv = document.createElement("div");
    rakamDiv.className = "rakam";
    rakamDiv.innerText = char;
    rakamDiv.style.color = renk;

    const kalpDiv = document.createElement("div");
    kalpDiv.className = "kalp";
    kalpDiv.innerHTML = "&#10084;";
    kalpDiv.style.color = renk;

    tas.appendChild(rakamDiv);
    tas.appendChild(kalpDiv);
    tasContainer.appendChild(tas);
  });

}

