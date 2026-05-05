import { getVisiblePages } from "../helpers/paginationHelper";
import { Skin } from "../interfaces/Skin";
import { renderSkins } from "../services/selectCategory";

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
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const renderPagination = () => {
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
        updateView();
      });
    }

    container.appendChild(btn);
  });
};
