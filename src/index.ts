import { setupDetails } from "./services/detailsService";
import { setInputSrchToDsbld, setupFavorites, showFavorites } from "./services/favoritesService";
import { fetchSkins } from "./services/gamesDbService";
import { updateView } from "./services/pagination/pagination";
import { search } from "./services/searchService";
import { renderSkins, setupCategoryFilter } from "./services/selectCategory";
import "./css/style.css"

const buttons = document.querySelectorAll<HTMLButtonElement>(
  ".category-guns button",
);
const input = document.getElementById("search-input") as HTMLInputElement;
  

const main = async () => {
  const allSkins = await fetchSkins();
  localStorage.setItem("skins", JSON.stringify(allSkins));
  renderSkins(allSkins);
  search();
  setupCategoryFilter(allSkins);
  setupDetails();
  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      input.disabled = false;
      search();
      setupFavorites();
      setupDetails();
      updateView(1);
      setInputSrchToDsbld(false);
    });
  });
  setupFavorites();
  showFavorites(allSkins);
  updateView();
};

main();
