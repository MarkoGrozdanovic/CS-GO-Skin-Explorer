import { updateView } from "./pagination/pagination";
import {
  populateCases,
  setupCaseSimulator,
} from "./services/caseOpeningService";
import { setupDetails } from "./services/detailsService";
import { setupFavorites, showFavorites } from "./services/favoritesService";
import { fetchSkins } from "./services/gamesDbService";
import { search } from "./services/searchService";
import { renderSkins, setupCategoryFilter } from "./services/selectCategory";

const buttons = document.querySelectorAll<HTMLButtonElement>(
  ".category-guns button",
);

const main = async () => {
  const allSkins = await fetchSkins();
  localStorage.setItem("skins", JSON.stringify(allSkins));
  renderSkins(allSkins);
  search();
  setupCategoryFilter(allSkins);

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      setupFavorites();
      setupDetails();
      updateView(1);
    });
  });
  showFavorites(allSkins);
  updateView();

  // populateCases(allSkins);
  // setupCaseSimulator(allSkins);
};

main();
