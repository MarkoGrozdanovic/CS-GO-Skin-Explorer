export interface Skin {
  id: string;
  name: string;
  description: string;
  weapon: Weapon;
  category: Category;
  pattern: Pattern;
  min_float: number;
  max_float: number;
  rarity: Rarity;
  stattrak: boolean;
  souvenir: boolean;
  paint_index: string;
  wears: Wear[];
  collections: Collection[]; // empty array but typed for future use
  crates: Crate[];
  team: Team;
  legacy_model: boolean;
  image: string;
  original: Original;
}

export interface Weapon {
  id: string;
  weapon_id: number;
  name: string;
}

export interface Category {
  id: string;
  name: string;
}

export interface Pattern {
  id: string;
  name: string;
}

export interface Rarity {
  id: string;
  name: string;
  color: string;
}

export interface Wear {
  id: string;
  name: string;
}

export interface Collection {
  // Not defined in your example, so keeping it flexible
  [key: string]: any;
}

export interface Crate {
  id: string;
  name: string;
  image: string;
}

export interface Team {
  id: string;
  name: string;
}

export interface Original {
  name: string;
}
