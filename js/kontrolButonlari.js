/**
 * kontrolButonlar.js
 * 
 * Bu dosya, oyunun kontrol butonları için fonksiyonlar içerir.
 * Aşağıdaki fonksiyon, oyunu sıfırlama işlemini gerçekleştirir:
 *  - localStorage üzerinde tutulan 'okeyAyarlar' ve 'okeySkorVeri' verilerini siler.
 *  - Ardından kullanıcıyı giriş ekranına ("giris_ekrani.html") yönlendirir.
 */

function oyunuSifirla() {
    // 1. Oyun ayarlarını localStorage'dan kaldır (okeyAyarlar anahtarı)
    localStorage.removeItem('okeyAyarlar');
    
    // 2. Oyun skor verisini localStorage'dan kaldır (okeySkorVeri anahtarı)
    localStorage.removeItem('okeySkorVeri');
    
    // 3. Kullanıcıyı giriş ekranına yönlendir (giris_ekrani.html)
    window.location.href = 'giris_ekrani.html';
}

/* 
 * Eğer HTML sayfanızda "Oyunu Sıfırla" butonu varsa, 
 * aşağıdaki kod o butona tıklandığında oyunuSifirla() fonksiyonunu çalıştırır.
 * (Butonun id değeri örnekte "sifirlaButonu" olarak varsayılmıştır.)
 */
const sifirlaButonu = document.getElementById('sifirlaButonu');
if (sifirlaButonu) {
    sifirlaButonu.addEventListener('click', oyunuSifirla);
}