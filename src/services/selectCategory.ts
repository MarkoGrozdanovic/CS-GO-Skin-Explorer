import { Skin } from "../interfaces/Skin";

const container = document.getElementById("skins-container") as HTMLDivElement;
const buttons = document.querySelectorAll<HTMLButtonElement>(
    ".category-guns button",
  );
const favButton = document.getElementById(
  "show-favorites",
) as HTMLButtonElement;


export const renderSkins = (skins: Skin[]) => {
  container.innerHTML = skins
    .map((skin) => {
      return `
        <div class="card">
          <button class="favorite-btn" data-id="${skin.id}">♡</button>

          <img src="${skin.image}" alt="${skin.name}" />
          <h3>${skin.name}</h3>
          <p>${skin.weapon.name}</p>

          <p class="rarity" style="color:${skin.rarity.color}">
            ${skin.rarity.name}
          </p>
          <button class="show-details" data-id="${skin.id}">Show Details</button>
        </div>
      `;
    })
    .join("");
};

const getByCategory = (skins: Skin[], category: string): Skin[] => {
  if (category === "All") return skins;

  return skins.filter(
    (skin) => skin.category.name.toLowerCase() === category.toLowerCase(),
  );
};

export const setupCategoryFilter = (allSkins: Skin[]): void => {
  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      localStorage.removeItem("skins");
      // remove active from all
      buttons.forEach((b) => b.classList.remove("active"));
      favButton.classList.remove("active");

      // add active to clicked
      btn.classList.add("active");

      const category = btn.getAttribute("data-category")!;

      const filtered = getByCategory(allSkins, category);
      localStorage.setItem("skins", JSON.stringify(filtered));
      renderSkins(filtered);
    });
  });
};
