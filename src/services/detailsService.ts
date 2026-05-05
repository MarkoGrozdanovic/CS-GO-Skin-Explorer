import { Skin } from "../interfaces/Skin";

const modal = document.getElementById("details-modal")!;
const closeBtn = document.getElementById("close-modal")!;

const showDetails = (skin: Skin) => {
  (document.getElementById("details-image") as HTMLImageElement).src =
    skin.image;
  document.getElementById("details-name")!.textContent = skin.name;
  document.getElementById("details-weapon")!.textContent = skin.weapon.name;
  document.getElementById("details-rarity")!.textContent = skin.rarity.name;
  document.getElementById("details-description")!.innerHTML = skin.description;

  modal.classList.remove("hidden");
};

export const setupDetails = () => {
  const cards = document.querySelectorAll(".card");
  const storedSkins = localStorage.getItem("skins");
  const skins: Skin[] = storedSkins ? JSON.parse(storedSkins) : [];

  cards.forEach((card) => {
    card.addEventListener("click", () => {
      console.log("hello");

      const id = card.getAttribute("data-id");
      const skin = skins.find((s) => s.id === id);

      if (skin) showDetails(skin);
    });
  });

  closeBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
  });
};
