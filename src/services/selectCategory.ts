import { Skin } from "../interfaces/Skin";

const container = document.getElementById("skins-container") as HTMLDivElement;

export const renderSkins = (skins: Skin[]) => {
  container.innerHTML = skins
    .map((skin) => {
      return `
        <div class="card">
          <img src="${skin.image}" alt="${skin.name}" />
          <h3>${skin.name}</h3>
          <p>${skin.weapon.name}</p>
          <p class="rarity" style="color:${skin.rarity.color}">
            ${skin.rarity.name}
          </p>
        </div>
      `;
    })
    .join("");
};

const getByCategory = (skins: Skin[], category: string): Skin[] => {
  if (category === "terrorists" || category === "counter-terrorists") {
    return skins.filter(
      (skin) => skin.team.id.toLowerCase() === category.toLowerCase(),
    );
  }

  if (category === "All") return skins;

  return skins.filter(
    (skin) => skin.category.name.toLowerCase() === category.toLowerCase(),
  );
};

export const setupCategoryFilter = (allSkins: Skin[]) => {
  const buttons = document.querySelectorAll(".category-bar button");
  console.log(buttons);

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      // remove active from all
      buttons.forEach((b) => b.classList.remove("active"));

      // add active to clicked
      btn.classList.add("active");

      const category = btn.getAttribute("data-category")!;

      const filtered = getByCategory(allSkins, category);

      renderSkins(filtered);
    });
  });
};
