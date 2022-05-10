const todoItem = document.querySelector("#todo-item");
const todoEkle = document.querySelector("#ekle"); // tıklama butonu
let itemsArray = localStorage.getItem("yapilacaklar") ? JSON.parse(localStorage.getItem("yapilacaklar")) : [];

// Liste öğelerini oluşturmak için
todoEkle.onclick = function() {
    // td'leri oluşturuyoruz
    let maddeKolon = document.createElement("td");
    let silKolon = document.createElement("td");    

    // td'lerin içeriğini oluşturuyoruz
    maddeKolon.textContent = todoItem.value; // textbox'tan değeri okuyup aktarıyoruz
    silKolon.innerHTML = "<button value='🗑️' id='sil' onclick='sil(this)' onmouseover='silOver()' onmouseout='silOut()' class='sil'>🗑️</button>"; // sil butonu

    // tr oluşturuyoruz
    let tr = document.createElement("tr");

    // td'ler tr içine ekleniyor
    tr.appendChild(maddeKolon);
    tr.appendChild(silKolon);

    // tr elemanı tablo içine ekleniyor
    liste.appendChild(tr);

    itemsArray.push(todoItem.value);
    localStorage.setItem("yapilacaklar", JSON.stringify(itemsArray));
}

// Sayfayı yeniledikten sonra liste öğelerini gösterebilmek için
if (itemsArray.length != 0) {
    // Liste öğelerini tek tek çağırıyoruz
    for(let s = 0; s < itemsArray.length; s++) {
    // td'leri oluşturuyoruz
    let maddeKolon = document.createElement("td");
    let silKolon = document.createElement("td");

    // td'lerin içeriğini oluşturuyoruz
    maddeKolon.textContent = itemsArray[s]; // Bu sefer localStorage'dan okuyup aktarıyoruz
    silKolon.innerHTML = "<button value='🗑️' id='sil' onclick='sil(this)' onmouseover='silOver()' onmouseout='silOut()' class='sil'>🗑️</button>"; // sil butonu

    // tr oluşturuyoruz
    let tr = document.createElement("tr");
    
    // td'ler tr içine ekleniyor
    tr.appendChild(maddeKolon);
    tr.appendChild(silKolon);

    // tr elemanı tablo içine ekleniyor
    liste.appendChild(tr);
    }
}

// Liste öğelerinin tümünü silmek için
temizle.onclick = function() {
    localStorage.clear();
    itemsArray = [];

    while (liste.firstChild) {
    liste.removeChild(liste.firstChild);
}
}

// Liste öğelerini tek tek silmek için
function sil(r) {
let i = r.parentNode.parentNode.rowIndex;
document.getElementById("liste").deleteRow(i);

// Liste öğesine ait veriyi localStorage'dan silmek için
itemsArray.splice(i, 1);
localStorage.setItem("yapilacaklar", JSON.stringify(itemsArray));
}

// Deneysel bölüm //

// Ekleme sonrası form alanını temizleme
function form_temizle() {
    document.getElementById("todo-form").reset();
    }

// Silme butonu üzerine gelince yapılacaklardaki aktif satırın rengini değiştiriyoruz
function silOver() {
    let temizle = document.querySelector("#liste td:first-child");
    temizle.style.backgroundColor = "#fdffcd";
}
function silOut() {
    let temizle = document.querySelector("#liste td:first-child");
    temizle.style.backgroundColor = "white";
}