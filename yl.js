const todoItem = document.querySelector("#todo-item"); // textbox 
const todoEkle = document.querySelector("#ekle"); // tıklama butonu
let itemsArray = localStorage.getItem("yapilacaklar") ? JSON.parse(localStorage.getItem("yapilacaklar")) : [];

// Liste öğelerini oluşturmak için
todoEkle.onclick = function() {
    // div'leri oluşturuyoruz
    let madde = document.createElement("div"); 
    madde.className = "madde";

    let maddeIcerik = document.createElement("div");
    maddeIcerik.className = "maddeIcerik";
    
    let silDiv = document.createElement("div");
    silDiv.className = "silDiv";

    // div'lerin içeriğini oluşturuyoruz
    maddeIcerik.textContent = todoItem.value; // textbox'tan değeri okuyup aktarıyoruz
    silDiv.innerHTML = "<button value='🗑️' id='sil' onclick='sil(this)' class='sil'>🗑️</button>" // sil butonunu oluşturuyoruz

    // div'leri liste öğesine ekliyoruz
    liste.appendChild(madde); // liste maddesi
    madde.append(maddeIcerik, silDiv); // liste maddesi içeriği

    // textbox'a yazılan değeri localStorage'a ekliyoruz
    itemsArray.push(todoItem.value);
    localStorage.setItem("yapilacaklar", JSON.stringify(itemsArray));

    // liste öğesini ekledikten sonra textbox'ı temizliyoruz
    todoItem.value = "";
}

// Sayfayı yeniledikten sonra liste öğelerini gösterebilmek için
if (itemsArray.length != 0) {
    // Liste öğelerini tek tek çağırıyoruz
    for(let s = 0; s < itemsArray.length; s++) {
    // div'leri oluşturuyoruz
    let madde = document.createElement("div");
    madde.className = "madde";

    let maddeIcerik = document.createElement("div");
    maddeIcerik.className = "maddeIcerik";
    
    let silDiv = document.createElement("div");
    silDiv.className = "silDiv";

    // div'lerin içeriğini oluşturuyoruz
    maddeIcerik.textContent = itemsArray[s]; // Bu sefer localStorage'dan okuyup aktarıyoruz
    silDiv.innerHTML = "<button value='🗑️' id='sil' onclick='sil(this)' class='sil'>🗑️</button>"; // sil butonu

    // div'leri liste öğesine ekliyoruz
    liste.appendChild(madde);
    madde.append(maddeIcerik, silDiv);
    }
}

// Tüm liste öğelerini silmek için
temizle.onclick = function() {
    // localStorage'ı temizliyoruz
    localStorage.clear();
    itemsArray = [];

    while (liste.firstChild) {
    liste.removeChild(liste.firstChild);
    }
}

// Liste öğelerini tek tek silmek için
function sil(r) {
    // silme butonuna tıklayınca seçilen maddeyi siliyoruz
    let silinecek = r.parentNode.parentNode;
    silinecek.parentNode.removeChild(silinecek);

    // localStorage'dan silinecek öğeyi çıkartıyoruz
    let silinecekIndex = itemsArray.indexOf(silinecek.childNodes[0].textContent);
    itemsArray.splice(silinecekIndex, 1);
    localStorage.setItem("yapilacaklar", JSON.stringify(itemsArray));
}

// Enter'a basıldığında liste öğesinin eklenmesini sağlıyoruz
document.onkeydown = function(e){
    let key = e.key;
    if(key == "Enter"){
        todoEkle.click();
    }
}

// Deneysel bölüm //

// Silme butonu üzerine gelince yapılacaklardaki aktif satırın rengini değiştiriyoruz
// function silOver() {
//     document.querySelector("#liste div").style.backgroundColor = "#fdffcd";
// }
// function silOut() {
//     document.querySelector("#liste div").style.backgroundColor = "white";
// }