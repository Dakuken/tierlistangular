import { TierlistItem } from "./tierlistComponent.interface";

export interface Tierlist {
  author: string,
  description: string,
  name: string,
  isPublic: boolean,
  items: TierlistItem[]
}


