import type { Ingredient } from "./ingredient"

export type Pizza = {
    id: number,
    name: string,
    ingredients: Ingredient[],
    price: number
}