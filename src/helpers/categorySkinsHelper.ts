import { Skin } from "../interfaces/Skin";

export const getCategorySkins = (): Skin[] => {
  const storedSkins = localStorage.getItem("skins");
  return storedSkins ? JSON.parse(storedSkins) : [];
};
