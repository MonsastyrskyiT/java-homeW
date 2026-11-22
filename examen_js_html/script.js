"use strict";

const pets = [
  {
    name: "Джесі",
    breed: "Бігль. На прогулянці досліджує кожен кущик, а вдома любить засинати поруч.",
    age: "1 рік",
    imageUrl: petPhotos.jessie,
  },
  {
    name: "Арчі",
    breed: "Джек-рассел-тер’єр. Завжди тримає м’ячик напоготові й першим запрошує до гри.",
    age: "2 роки",
    imageUrl: petPhotos.archie,
  },
  {
    name: "Байт",
    breed: "Метис ретривера. Любить тихі вечірні прогулянки й охоче кладе голову на коліна.",
    age: "4 роки",
    imageUrl: petPhotos.byte,
  },
];

function copyTemplate(id) {
  const template = document.getElementById(id);
  return template.content.firstElementChild.cloneNode(true);
}

function Header() {
  return copyTemplate("header-template");
}

function Hero() {
  return copyTemplate("hero-template");
}

function PetCard({ name, breed, age, imageUrl }) {
  const card = copyTemplate("pet-card-template");
  const photo = card.querySelector(".pet-photo");
  photo.src = imageUrl;
  photo.alt = `На фото — ${name}`;

  card.querySelector(".pet-name").textContent = name;
  card.querySelector(".pet-breed").textContent = breed;
  card.querySelector(".age-value").textContent = age;
  return card;
}

function Footer() {
  const footer = copyTemplate("footer-template");
  const year = String(new Date().getFullYear());
  const time = footer.querySelector("time");
  time.dateTime = year;
  time.textContent = year;
  return footer;
}

const main = document.querySelector("main");
main.before(Header());
main.prepend(Hero());
document.querySelector(".pet-grid").append(...pets.map(PetCard));
main.after(Footer());
