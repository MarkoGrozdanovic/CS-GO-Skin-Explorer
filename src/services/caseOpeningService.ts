import { Skin } from "../interfaces/Skin";

const getCases = (skins: Skin[]) => {
  const map = new Map<string, string>();

  skins.forEach((skin) => {
    skin.crates.forEach((c) => {
      map.set(c.id, c.name);
    });
  });

  return Array.from(map, ([id, name]) => ({ id, name }));
};

export const populateCases = (skins: Skin[]) => {
  const select = document.getElementById("case-select") as HTMLSelectElement;
  const cases = getCases(skins);

  if (!select) {
    console.error("case-select not found in DOM");
    return;
  }

  cases.forEach((c) => {
    const option = document.createElement("option");
    option.value = c.id;
    option.textContent = c.name;
    select.appendChild(option);
  });
};

const getSkinsByCase = (skins: Skin[], caseId: string) => {
  return skins.filter((skin) => skin.crates.some((c) => c.id === caseId));
};

const rarityWeights: Record<string, number> = {
  Consumer: 40,
  Industrial: 30,
  MilSpec: 15,
  Restricted: 8,
  Classified: 5,
  Covert: 2,
  Extraordinary: 1,
};

const getRandomSkin = (skins: Skin[]) => {
  const weighted: Skin[] = [];

  skins.forEach((skin) => {
    const weight = rarityWeights[skin.rarity.name] || 1;

    for (let i = 0; i < weight; i++) {
      weighted.push(skin);
    }
  });

  return weighted[Math.floor(Math.random() * weighted.length)];
};

const spinRoulette = (skins: Skin[], winner: Skin) => {
  const container = document.getElementById("roulette")!;
  container.innerHTML = "";

  const track = document.createElement("div");
  track.className = "roulette-track";

  const items: Skin[] = [];

  // generate random list
  for (let i = 0; i < 30; i++) {
    items.push(skins[Math.floor(Math.random() * skins.length)]);
  }

  // ubaci winner na kraj
  items.push(winner);

  items.forEach((skin) => {
    const div = document.createElement("div");
    div.className = "roulette-item";
    div.textContent = skin.name;
    track.appendChild(div);
  });

  container.appendChild(track);

  // animate
  setTimeout(() => {
    track.style.transform = "translateX(-80%)";
  }, 50);
};

export const setupCaseSimulator = (skins: Skin[]) => {
  const btn = document.getElementById("open-case-btn")!;
  const select = document.getElementById("case-select") as HTMLSelectElement;

  btn.addEventListener("click", () => {
    const caseId = select.value;

    const caseSkins = getSkinsByCase(skins, caseId);

    const winner = getRandomSkin(caseSkins);

    spinRoulette(caseSkins, winner);

    setTimeout(() => {
      document.getElementById("result")!.textContent =
        `You got: ${winner.name}`;
    }, 3000);
  });
};
