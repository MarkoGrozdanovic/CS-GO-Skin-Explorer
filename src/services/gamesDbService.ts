import axios from "axios";
import { Skin } from "../interfaces/Skin";

const API_URL =
  "https://raw.githubusercontent.com/ByMykel/CSGO-API/main/public/api/en/skins.json";

export const fetchSkins = async (): Promise<Skin[]> => {
  try {
    const response = await axios.get<Skin[]>(API_URL);

    return response.data;
  } catch (error) {
    console.error("Error fetching skins:", error);
    throw error;
  }
};

export const fetchKnives = async (): Promise<Skin[]> => {
  const skins = await fetchSkins();
  return skins.filter((skin) => skin.category.name === "Knives");
};

export const fetchRifles = async (): Promise<Skin[]> => {
  const skins = await fetchSkins();
  return skins.filter((skin) => skin.category.name === "Rifles");
};

export const fetchPistols = async (): Promise<Skin[]> => {
  const skins = await fetchSkins();
  return skins.filter((skin) => skin.category.name === "Pistols");
};

export const fetchGloves = async (): Promise<Skin[]> => {
  const skins = await fetchSkins();
  return skins.filter((skin) => skin.category.name === "Gloves");
};

export const fetchHeavy = async (): Promise<Skin[]> => {
  const skins = await fetchSkins();
  return skins.filter((skin) => skin.category.name === "Heavy");
};

export const fetchSMGs = async (): Promise<Skin[]> => {
  const skins = await fetchSkins();
  return skins.filter((skin) => skin.category.name === "SMGs");
};
