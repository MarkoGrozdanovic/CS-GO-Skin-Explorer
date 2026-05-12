import "./css/realOrFake.css"
import { Skin } from "./interfaces/Skin";
import { fetchSkins } from "./services/gamesDbService";

let skins: Skin[] = [];

let currentSkin: Skin;

let currentAnswerIsReal:boolean = true;

let score:number = 0;

const fakeWords:string[] = [
  "Phantom",
  "Venom",
  "Inferno",
  "Toxic",
  "Shadow",
  "Oblivion",
  "Crimson",
  "Vortex",
  "Cyber",
  "Frostbite",
];

const imageElement = document.getElementById(
  "skin-image"
) as HTMLImageElement;

const skinNameElement = document.getElementById(
  "skin-name"
) as HTMLElement;

const scoreElement = document.getElementById(
  "score"
) as HTMLElement;

const bestScoreElement = document.getElementById(
  "best-score"
) as HTMLElement;

const resultMessage = document.getElementById(
  "result-message"
) as HTMLElement;

const nextBtn = document.getElementById(
  "next-btn"
) as HTMLButtonElement;

const realBtn = document.getElementById(
  "real-btn"
) as HTMLButtonElement;

const fakeBtn = document.getElementById(
  "fake-btn"
) as HTMLButtonElement;

const getRandomSkin = (): Skin => {
  return skins[Math.floor(Math.random() * skins.length)];
};

const generateFakeName = (
  skin: Skin
): string => {
  const randomWord =
    fakeWords[
      Math.floor(
        Math.random() * fakeWords.length
      )
    ];

  return `${skin.weapon.name} | ${randomWord}`;
};

const updateBestScore = () => {
  const best = Number(
    localStorage.getItem("realFakeBest")
  );

  if (score > best) {
    localStorage.setItem(
      "realFakeBest",
      score.toString()
    );

    bestScoreElement.textContent =
      score.toString();
  }
};

const generateRound = () => {
  resultMessage.textContent = "";

  nextBtn.classList.add("hidden");

  realBtn.disabled = false;
  fakeBtn.disabled = false;

  currentSkin = getRandomSkin();

  imageElement.src = currentSkin.image;

  currentAnswerIsReal =
    Math.random() > 0.5;

  if (currentAnswerIsReal) {
    skinNameElement.textContent =
      currentSkin.name;
  } else {
    skinNameElement.textContent =
      generateFakeName(currentSkin);
  }
};

const handleAnswer = (
  userThinksReal: boolean
) => {
  realBtn.disabled = true;
  fakeBtn.disabled = true;

  const correct:boolean =
    userThinksReal === currentAnswerIsReal;

  if (correct) {
    score++;

    scoreElement.textContent =
      score.toString();

    updateBestScore();

    resultMessage.textContent =
      "✅ Correct!";
  } else {
    resultMessage.textContent =
      `❌ Wrong! It was ${
        currentAnswerIsReal
          ? "REAL"
          : "FAKE"
      }`;

    score = 0;

    scoreElement.textContent = "0";
  }

  nextBtn.classList.remove("hidden");
};

const main = async () => {
  skins = await fetchSkins();

  const best = localStorage.getItem(
    "realFakeBest"
  );

  if (best) {
    bestScoreElement.textContent = best;
  }

  generateRound();

  realBtn.addEventListener("click", () => {
    handleAnswer(true);
  });

  fakeBtn.addEventListener("click", () => {
    handleAnswer(false);
  });

  nextBtn.addEventListener("click", () => {
    generateRound();
  });
};

main();