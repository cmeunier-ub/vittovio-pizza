import type { Ingredient } from "../models/ingredient";

class IngredientsService
{
    public async findAll(): Promise<Ingredient[]>
    {
        return [
            { id: 1, name: "Mozzarella", outOfStock: false },
            { id: 2, name: "Jambon", outOfStock: false },
            { id: 3, name: "Champignons", outOfStock: false },
            { id: 4, name: "Saumon fumé", outOfStock: false },
            { id: 5, name: "Brocolis", outOfStock: false },
            { id: 6, name: "Gorgonzolla", outOfStock: false },
            { id: 7, name: "Gruyère", outOfStock: false },
        ]
    }

    public async create(): Promise<Ingredient | null>
    {
        return { id: 0, name: "Nouvel ingrédient", outOfStock: false };
    }
}

export const ingredientsService = new IngredientsService();