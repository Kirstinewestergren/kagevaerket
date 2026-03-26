document.addEventListener("DOMContentLoaded", () => {
  /* BURGER MENU */
  window.toggleNav = function () {
    document.getElementById("myTopnav").classList.toggle("responsive");
  };

  function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  }

  // Dropdown toggle for PROJEKTER

  document
    .querySelector(".dropdown-btn")
    .addEventListener("click", function (e) {
      e.preventDefault();
      const content = this.nextElementSibling;
      content.style.display =
        content.style.display === "block" ? "none" : "block";
    });

  /* DRINKS & CART */
  const cakes = [
    { name: "Chokolade kage", price: 100, available: true },
    { name: "Vanilje kage", price: 90, available: true },
    { name: "Jordbær kage", price: 120, available: false },
  ];

  const menu = document.querySelector("#menu");
  const cartList = document.querySelector("#cart");
  const totalText = document.querySelector("#total");
  const sizeSelect = document.querySelector("#size");
  const toppingsInputs = document.querySelectorAll("input[type='checkbox']");
  let cart = [];

  function updateStatus() {
    const hour = new Date().getHours();
    document.querySelector("#status").textContent =
      hour >= 10 && hour < 18 ? "Butikken er åben" : "Butikken er lukket";
  }

  function getToppingsPrice() {
    let sum = 0;
    toppingsInputs.forEach((t) => {
      if (t.checked) sum += Number(t.value);
    });
    return sum;
  }

  function renderCakes() {
    cakes.forEach((cake) => {
      const div = document.createElement("div");
      div.classList.add("cake");
      div.textContent = `${cake.name} - ${cake.price} kr`;
      if (!cake.available) {
        div.classList.add("soldout");
        div.textContent += " (Udsolgt)";
      }
      div.addEventListener("click", () => {
        if (!cake.available) return alert("Udsolgt");
        const sizePrice = Number(sizeSelect.value);
        const toppingsPrice = getToppingsPrice();
        const finalPrice = cake.price + sizePrice + toppingsPrice;
        cart.push({ name: cake.name, price: finalPrice });
        renderCart();
      });
      menu.appendChild(div);
    });
  }

  function renderCart() {
    cartList.innerHTML = "";
    cart.forEach((item, index) => {
      const li = document.createElement("li");
      li.textContent = `${item.name} - ${item.price} kr`;
      const removeBtn = document.createElement("button");
      removeBtn.textContent = "x";
      removeBtn.addEventListener("click", () => {
        cart.splice(index, 1);
        renderCart();
      });
      li.appendChild(removeBtn);
      cartList.appendChild(li);
    });
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    totalText.textContent = `Total: ${total} kr`;
  }

  document.querySelector("#saveBtn").addEventListener("click", () => {
    localStorage.setItem("order", JSON.stringify(cart));
    alert("Bestilling gemt!");
  });

  updateStatus();
  renderCakes();
});

//Hero video tekst //
const lines = document.querySelectorAll(".hero-text .line");

lines.forEach((line, index) => {
  setTimeout(
    () => {
      line.classList.add("visible"); // tilføjer fade-in klassens animation
    },
    index * 800 + 500,
  ); // 500 ms delay før første linje, 800 ms mellem linjer
});

//infobox//

const buttons = document.querySelectorAll(".infoButton");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const infoBox = button.nextElementSibling;

    // Åbn/luk infoboks
    infoBox.classList.toggle("active");

    // Skjul/vis knap
    if (infoBox.classList.contains("active")) {
      button.style.display = "none";
    } else {
      button.style.display = "block";
    }
  });
});

// Luk når man klikker på selve infoboksen
const infoBoxes = document.querySelectorAll(".infoBox");

infoBoxes.forEach((box) => {
  box.addEventListener("click", () => {
    box.classList.remove("active");

    // Find knappen i samme kasse og vis den igen
    const button = box.previousElementSibling;
    button.style.display = "block";
  });
});

//Åbningstider//
function displayDay() {
  // Henter den nuværende ugedag som et tal (0 = søndag, 6 = lørdag)
  let date = new Date().getDay();

  console.log(date);

  // Variabel til at gemme dagens navn som tekst
  let day;

  // Oversætter tallet til en ugedag
  switch (date) {
    case 0:
      day = "Søndag";
      break;

    case 1:
      day = "Mandag";
      break;

    case 2:
      day = "Tirsdag";
      break;

    case 3:
      day = "Onsdag";
      break;

    case 4:
      day = "Torsdag";
      break;

    case 5:
      day = "Fredag";
      break;

    case 6:
      day = "Lørdag";
      break;
  }

  // Returnerer dagens navn (fx "Mandag")
  return day;
}

// Kalder funktionen og får dagens navn (fx "Mandag")
const today = displayDay();

// Finder elementet hvor status skal vises (Åben / Lukket)
const status = document.getElementById("status");

// Henter den aktuelle time (0–23)
const hour = new Date().getHours();

// Henter dagens nummer (0 = søndag, 6 = lørdag)
const date = new Date().getDay();

// Definerer åbningstider
const openTime = 9; // Åbner kl. 09
const closeTime = 16; // Lukker kl. 16 (mandag–fredag)
const closeTimeSaturday = 14; // Lukker kl. 14 (lørdag)

// Variabel til tekst (Åben nu / Lukket)
let statusTid;

if (date === 0) {
  statusTid = "Lukket";
  // Tilføjer CSS class for lukket
  status.classList.add("closed");
  status.classList.remove("open");

  // Hvis det er lørdag og indenfor åbningstid
} else if (date === 6 && hour >= openTime && hour < closeTimeSaturday) {
  statusTid = "Åben nu";

  // Tilføjer CSS class for åben
  status.classList.add("open");
  status.classList.remove("closed");

  // Hvis det er mandag–fredag og indenfor åbningstid
} else if (date >= 1 && date <= 5 && hour >= openTime && hour < closeTime) {
  statusTid = "Åben nu";

  // Tilføjer CSS class for åben
  status.classList.add("open");
  status.classList.remove("closed");
} else {
  // Ellers → lukket
  statusTid = "Lukket";

  // Tilføjer CSS class for lukket
  status.classList.add("closed");
  status.classList.remove("open");
}

// Skriver resultatet ud på siden
document.getElementById("shopStatus").innerHTML =
  "I dag er det " + today + ". Butikken er " + statusTid;
