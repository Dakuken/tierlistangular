import TierlistItem from "./TierlistItem.model";

export class Tierlist {
  author: string
  description: string
  name: string
  isPublic: boolean
  items: TierlistItem[]

  constructor(author: string, description: string, name: string, isPublic: boolean, items: TierlistItem[]) {
    this.author = author
    this.description = description
    this.name = name
    this.isPublic = isPublic
    this.items = items
  }
}


