import { Skin } from "../interfaces/Skin";
import { renderSkins } from "./selectCategory";

export const search = (): void => {
  const input = document.getElementById("search-input") as HTMLInputElement;

  input.addEventListener("change", (e) => {
    const storedSkins = localStorage.getItem("skins");

    const skins: Skin[] = storedSkins ? JSON.parse(storedSkins) : [];

    const filtered = skins.filter((skin) => {
      return skin.name.includes((e.currentTarget as HTMLInputElement).value);
    });

    renderSkins(filtered);
  });
};
