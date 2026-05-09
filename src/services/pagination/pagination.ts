import { getVisiblePages } from "../../helpers/paginationHelper";
import { Skin } from "../../interfaces/Skin";
import { setupDetails } from "../detailsService";
import { setupFavorites } from "../favoritesService";
import { fetchSkins } from "../gamesDbService";
import { renderSkins } from "../selectCategory";

let currentPage = 1;
const itemsPerPage = 20;
let filteredSkins: Skin[] = [];

const getPaginatedData = (): Skin[] => {
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;

  return filteredSkins.slice(start, end);
};

export const updateView = (current?: number | null): void => {
  if (current) {
    currentPage = current;
  }
  const storedSkins = localStorage.getItem("skins");
  const skins = storedSkins ? JSON.parse(storedSkins) : [];
  filteredSkins = skins;
  const paginated = getPaginatedData();
  renderSkins(paginated);
  renderPagination();
  setupFavorites();
  setupDetails();
  window.scrollTo({ top: 0, behavior: "smooth" });
};

export const updateViewForFavorites = async (
  current?: number | null,
  favoritesArg?: Skin[],
) => {
  if (current) {
    currentPage = 1;
  }
  const allSkins = await fetchSkins();

  const favoriteSkins = localStorage.getItem("favorites");
  const parsedFavSkins: string[] = favoriteSkins
    ? JSON.parse(favoriteSkins)
    : [];

  const favorites: Skin[] = !favoritesArg
    ? allSkins.filter((skin) => {
        return parsedFavSkins.includes(skin.id);
      })
    : favoritesArg;

  filteredSkins = favorites;

  const paginated = getPaginatedData();
  renderSkins(paginated);
  renderPagination(true);
  setupFavorites();
  setupDetails();
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const renderPagination = (favorites?: boolean) => {
  const container = document.getElementById("pagination")!;
  const totalPages = Math.ceil(filteredSkins.length / itemsPerPage);

  container.innerHTML = "";

  const pages = getVisiblePages(totalPages, currentPage);

  pages.forEach((p) => {
    const btn = document.createElement("button");

    if (p === "...") {
      btn.textContent = "...";
      btn.disabled = true;
    } else {
      btn.textContent = p.toString();

      if (p === currentPage) {
        btn.classList.add("active");
      }

      btn.addEventListener("click", () => {
        currentPage = p as number;
        if (favorites) {
          updateViewForFavorites();
        } else {
          updateView();
        }
      });
    }

    container.appendChild(btn);
  });
};
function async(curren: any, arg1: any, arg2: any) {
  throw new Error("Function not implemented.");
}

