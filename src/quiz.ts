
import { Skin } from "./interfaces/Skin";
import { fetchSkins } from "./services/gamesDbService";
import "./css/quiz.css"

let allSkins: Skin[] = [];

let correctAnswer: Skin;

const quizImage = document.getElementById(
  "quiz-image"
) as HTMLImageElement;

const quizOptions = document.getElementById(
  "quiz-options"
) as HTMLDivElement;

const quizResult = document.getElementById(
  "quiz-result"
) as HTMLParagraphElement;

const nextQuestionBtn = document.getElementById(
  "next-question"
) as HTMLButtonElement;

const getRandomSkin = (): Skin => {
  return allSkins[Math.floor(Math.random() * allSkins.length)];
};

const shuffleArray = <T>(array: T[]): T[] => {
  return [...array].sort(() => Math.random() - 0.5);
};

const generateQuestion = () => {
  quizResult.textContent = "";

  quizOptions.innerHTML = "";

  quizImage.style.filter = "blur(8px)";

  correctAnswer = getRandomSkin();

  quizImage.src = correctAnswer.image;

  const wrongAnswers: Skin[] = [];

  while (wrongAnswers.length < 3) {
    const randomSkin = getRandomSkin();

    const alreadyExists =
      wrongAnswers.some((skin) => skin.id === randomSkin.id) ||
      randomSkin.id === correctAnswer.id;

    if (!alreadyExists) {
      wrongAnswers.push(randomSkin);
    }
  }

  const answers = shuffleArray([
    correctAnswer,
    ...wrongAnswers,
  ]);

  answers.forEach((skin) => {
    const button = document.createElement("button") as HTMLButtonElement;

    button.textContent = skin.name;

    button.addEventListener("click", () => {
      quizImage.style.filter = "blur(0px)";

      if (skin.id === correctAnswer.id) {
        button.classList.add("correct");

        quizResult.textContent = "✅ Correct!";
      } else {
        button.classList.add("wrong");

        quizResult.textContent = `❌ Wrong! Correct answer: ${correctAnswer.name}`;

        const allButtons =
          quizOptions.querySelectorAll("button");

        allButtons.forEach((btn) => {
          if (btn.textContent === correctAnswer.name) {
            btn.classList.add("correct");
          }
        });
      }
    });

    quizOptions.appendChild(button);
  });
};

const main = async () => {
  allSkins = await fetchSkins();

  generateQuestion();

  nextQuestionBtn.addEventListener("click", () => {
    generateQuestion();
  });
};

main();