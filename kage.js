// Kører først når hele HTML siden er indlæst //
document.addEventListener("DOMContentLoaded", () => {
  /* BURGER MENU */

  // Gør funktionen global så den kan bruges i HTML //
  window.toggleNav = function () {
    document.getElementById("myTopnav").classList.toggle("responsive");
  };

  function myFunction() {
    var x = document.getElementById("myTopnav");

    // Tjekker om menuen er åben eller lukket
    if (x.className === "topnav") {
      x.className += " responsive"; // åbner menu
    } else {
      x.className = "topnav"; // lukker menu
    }
  }

  /* DROPDOWN MENU */

  // Finder dropdown knap og laver klik-event //
  document
    .querySelector(".dropdown-btn")
    .addEventListener("click", function (e) {
      e.preventDefault(); // stopper standard link handling

      const content = this.nextElementSibling;

      // Skifter mellem vist og skjult menu
      content.style.display =
        content.style.display === "block" ? "none" : "block";
    });

  /* ONLINE BESTILLING (KAGER) */

  // Liste over kager med navn, pris og tilgængelighed //
  const cakes = [
    { name: "Chokolade kage", price: 100, available: true },
    { name: "Vanilje kage", price: 90, available: true },
    { name: "Jordbær kage", price: 120, available: false },
  ];

  // Henter HTML elementer //
  const menu = document.querySelector("#menu");
  const cartList = document.querySelector("#cart");
  const totalText = document.querySelector("#total");
  const sizeSelect = document.querySelector("#size");
  const toppingsInputs = document.querySelectorAll("input[type='checkbox']");

  // Indkøbskurv (tom til at starte med) //
  let cart = [];

  /* ÅBNINGSSTATUS (simpel) */

  // Tjekker om butikken er åben ud fra klokkeslæt //
  function updateStatus() {
    const hour = new Date().getHours();

    document.querySelector("#status").textContent =
      hour >= 10 && hour < 18 ? "Butikken er åben" : "Butikken er lukket";
  }

  /* TOPPING PRIS */

  // Beregner ekstra pris for valgte toppings //
  function getToppingsPrice() {
    let sum = 0;

    toppingsInputs.forEach((t) => {
      if (t.checked) sum += Number(t.value);
    });

    return sum;
  }

  /* VIS KAGER PÅ SIDEN */

  function renderCakes() {
    cakes.forEach((cake) => {
      const div = document.createElement("div");
      div.classList.add("cake");

      // Viser navn og pris //
      div.textContent = `${cake.name} - ${cake.price} kr`;

      // Hvis kagen er udsolgt //
      if (!cake.available) {
        div.classList.add("soldout");
        div.textContent += " (Udsolgt)";
      }

      // Klik på kage = tilføj til kurv //
      div.addEventListener("click", () => {
        // Stop hvis udsolgt //
        if (!cake.available) return alert("Udsolgt");

        // Beregner samlet pris //
        const sizePrice = Number(sizeSelect.value);
        const toppingsPrice = getToppingsPrice();
        const finalPrice = cake.price + sizePrice + toppingsPrice;

        // Tilføjer til kurv //
        cart.push({ name: cake.name, price: finalPrice });

        // Opdaterer kurv //
        renderCart();
      });

      menu.appendChild(div);
    });
  }

  /* INDHOLD I KURV */

  function renderCart() {
    cartList.innerHTML = "";

    cart.forEach((item, index) => {
      const li = document.createElement("li");
      li.textContent = `${item.name} - ${item.price} kr`;

      // Fjern knap //
      const removeBtn = document.createElement("button");
      removeBtn.textContent = "x";

      // Fjerner element fra kurv //
      removeBtn.addEventListener("click", () => {
        cart.splice(index, 1);
        renderCart();
      });

      li.appendChild(removeBtn);
      cartList.appendChild(li);
    });

    // Beregner total pris //
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    totalText.textContent = `Total: ${total} kr`;
  }

  /* GEM BESTILLING */

  document.querySelector("#saveBtn").addEventListener("click", () => {
    // Gemmer kurv i localStorage //
    localStorage.setItem("order", JSON.stringify(cart));

    alert("Bestilling gemt!");
  });

  /* START FUNKTIONER */

  updateStatus();
  renderCakes();
});

/* HERO TEKST ANIMATION */

// Finder alle linjer i hero tekst //
const lines = document.querySelectorAll(".hero-text .line");

lines.forEach((line, index) => {
  setTimeout(
    () => {
      // Tilføjer animation (fade-in) //
      line.classList.add("visible");
    },
    index * 800 + 500,
  ); // forsinkelse mellem linjer //
});

/* INFOBOX SYSTEM */

const buttons = document.querySelectorAll(".infoButton");

// Åbner infoboks ved klik //
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const infoBox = button.nextElementSibling;

    // Toggle åbning/lukning //
    infoBox.classList.toggle("active");

    // Skjuler knap hvis åben //
    if (infoBox.classList.contains("active")) {
      button.style.display = "none";
    } else {
      button.style.display = "block";
    }
  });
});

// Luk infoboks når man klikker på den //
const infoBoxes = document.querySelectorAll(".infoBox");

infoBoxes.forEach((box) => {
  box.addEventListener("click", () => {
    box.classList.remove("active");

    // Viser knappen igen //
    const button = box.previousElementSibling;
    button.style.display = "block";
  });
});

/* ÅBNINGSTIDER (Jeppe) */

// Finder dagens ugedag //
function displayDay() {
  let date = new Date().getDay();
  let day;

  // Oversætter tal til dag //
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

  return day;
}

// Dagens navn //
const today = displayDay();

// Finder status element //
const status = document.getElementById("status");

// Tid og dag //
const hour = new Date().getHours();
const date = new Date().getDay();

// Åbningstider //
const openTime = 9;
const closeTime = 16;
const closeTimeSaturday = 14;

let statusTid;

// Lukket søndag //
if (date === 0) {
  statusTid = "Lukket";
  status.classList.add("closed");
  status.classList.remove("open");

  // Lørdag //
} else if (date === 6 && hour >= openTime && hour < closeTimeSaturday) {
  statusTid = "Åben nu";
  status.classList.add("open");
  status.classList.remove("closed");

  // Hverdage //
} else if (date >= 1 && date <= 5 && hour >= openTime && hour < closeTime) {
  statusTid = "Åben nu";
  status.classList.add("open");
  status.classList.remove("closed");

  // Lukket ellers //
} else {
  statusTid = "Lukket";
  status.classList.add("closed");
  status.classList.remove("open");
}

// Viser tekst på siden //
document.getElementById("shopStatus").innerHTML =
  "I dag er det " + today + ". Butikken er " + statusTid;

/* KONTAKTFORMULAR (EMAILJS)*/

// Starter EmailJS //
(function () {
  emailjs.init({
    publicKey: "PMf8u4RvUNFLCEzrU",
  });
})();

// Når siden er klar. //
window.onload = function () {
  // Når formular sendes //
  document
    .getElementById("contact-form")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      // Sender formular via EmailJS //
      emailjs.sendForm("service_vj4748i", "template_ec2oifn", this).then(
        function () {
          alert("Besked sendt!");
        },
        function (error) {
          alert("Fejl: " + error.text);
          console.log("FAILED...", error);
        },
      );
    });
};
