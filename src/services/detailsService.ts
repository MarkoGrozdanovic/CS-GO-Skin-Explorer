import { getCategorySkins } from "../helpers/categorySkinsHelper";
import { getFavorites } from "../helpers/favoritesHelper";
import { Skin } from "../interfaces/Skin";

const modal = document.getElementById("details-modal")!;
const closeBtn = document.getElementById("close-modal")!;

const showDetails = (skin: Skin) => {
  (document.getElementById("details-image") as HTMLImageElement).src =
    "https://placehold.co/600x400/EEE/31343C";
  document.getElementById("details-name")!.textContent = skin.name;
  document.getElementById("details-weapon")!.textContent = skin.weapon.name;
  document.getElementById("details-rarity")!.textContent = skin.rarity.name;
  document.getElementById("details-description")!.innerHTML = skin.description;

  modal.classList.remove("hidden");
};

export const setupDetails = () => {
  const cards = document.querySelectorAll(".show-details");
  const skins = getCategorySkins();
  getFavorites().forEach(favorite => {
    getCategorySkins().filter(skin => {
      skin.id = favorite
    })
  })

  cards.forEach((card) => {
    card.addEventListener("click", () => {
      const id = card.getAttribute("data-id");
      const skin = skins.find((s) => s.id === id);

      if (skin) showDetails(skin);
    });
  });

  closeBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
  });
};
