import "./css/caseSimulator.css";
import { Skin } from "./interfaces/Skin";
import { fetchSkins } from "./services/gamesDbService";

let allSkins: Skin[] = [];

/* -----------------------------------
   WEIGHTED RANDOM WINNER
------------------------------------ */
const getWeightedWinner = (skins: Skin[]): Skin => {
  const weighted: Skin[] = [];

  skins.forEach((skin) => {
    let weight = 10;

    switch (skin.rarity.name) {
      case "Covert":
        weight = 1;
        break;

      case "Classified":
        weight = 3;
        break;

      case "Restricted":
        weight = 5;
        break;

      default:
        weight = 10;
    }

    for (let i = 0; i < weight; i++) {
      weighted.push(skin);
    }
  });

  return weighted[
    Math.floor(Math.random() * weighted.length)
  ];
};

/* -----------------------------------
   BUILD ROULETTE WHEEL
------------------------------------ */
const buildWheel = (
  skins: Skin[],
  winner: Skin
): Skin[] => {
  const wheel = document.getElementById(
    "wheel"
  ) as HTMLElement;

  wheel.innerHTML = "";

  const items: Skin[] = [];

  // random filler items
  for (let i = 0; i < 60; i++) {
    items.push(
      skins[Math.floor(Math.random() * skins.length)]
    );
  }

  // guaranteed winner near end
  items.push(winner);

  items.forEach((skin) => {
    const div = document.createElement("div");

    div.className = "item";

    // rarity color
    div.style.borderBottom = `5px solid ${skin.rarity.color}`;

    div.innerHTML = `
      <img src="${skin.image}" alt="${skin.name}" />

      <p>${skin.name}</p>
    `;

    wheel.appendChild(div);
  });

  return items;
};

/* -----------------------------------
   SPIN ANIMATION
------------------------------------ */
const spinWheel = (
  winnerIndex: number
) => {
  const wheel = document.getElementById(
    "wheel"
  ) as HTMLElement;

  const wrapper = document.getElementById(
    "wheel-wrapper"
  ) as HTMLElement;

  const itemWidth = 160;

  const wrapperWidth = wrapper.offsetWidth;

  // center winner on red line
  const finalPosition =
    winnerIndex * itemWidth -
    wrapperWidth / 2 +
    itemWidth / 2;

  // reset animation
  wheel.style.transition = "none";

  wheel.style.transform = "translateX(0px)";

  // force browser repaint
  wheel.offsetHeight;

  // enable animation
  wheel.style.transition =
    "transform 6s cubic-bezier(0.1, 0.7, 0.1, 1)";

  requestAnimationFrame(() => {
    wheel.style.transform =
      `translateX(-${finalPosition}px)`;
  });
};

/* -----------------------------------
   OPEN CASE
------------------------------------ */
const openCase = (
  skins: Skin[]
) => {
  const winner =
    getWeightedWinner(skins);

  const wheelItems = buildWheel(
    skins,
    winner
  );

  const winnerIndex =
    wheelItems.findIndex(
      (skin) => skin.id === winner.id
    );

  spinWheel(winnerIndex);

  setTimeout(() => {
    const result = document.getElementById(
      "result"
    ) as HTMLElement;

    result.innerHTML = `
      🎉 You got:
      <span style="color:${winner.rarity.color}">
        ${winner.name}
      </span>
    `;
  }, 6500);
};

/* -----------------------------------
   MAIN
------------------------------------ */
const main = async () => {
    console.log("MAIN RUNNING");
  allSkins = await fetchSkins();

  // only skins from crates
  allSkins = allSkins.filter(
    (skin) => skin.crates.length > 0
  );

  const button =
    document.getElementById(
      "open-case"
    );


  if (button) {
    button.addEventListener(
      "click",
      () => {
        console.log("click works");
        
        openCase(allSkins);
      }
    );
  }
};

document.addEventListener(
  "DOMContentLoaded",
  main
);