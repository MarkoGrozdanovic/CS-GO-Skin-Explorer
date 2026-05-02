import { fetchSkins } from "./services/gamesDbService";
import { renderSkins, setupCategoryFilter } from "./services/selectCategory";

const main = async () => {
  const allSkins = await fetchSkins();
  renderSkins(allSkins);
  setupCategoryFilter(allSkins);
};

main();
