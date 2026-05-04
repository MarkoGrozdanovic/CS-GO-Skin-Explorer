export const getFavorites = (): string[] => {
  const fav = localStorage.getItem("favorites");
  return fav ? JSON.parse(fav) : [];
};

export const saveFavorites = (favorites: string[]) => {
  localStorage.setItem("favorites", JSON.stringify(favorites));
};
