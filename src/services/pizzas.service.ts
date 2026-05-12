import type { Pizza } from "../models/pizza";

class PizzasService
{
    public async findAll(): Promise<Pizza[]>
    {
        return [
            {
                id: 1,
                name: "Royale",
                price: 12,
                ingredients: [
                    { id: 1, name: "Mozzarella", outOfStock: false },
                    { id: 2, name: "Jambon", outOfStock: true },
                    { id: 3, name: "Champignons", outOfStock: false },
                ]
            },
            {
                id: 2,
                name: "3 Fromages",
                price: 12,
                ingredients: [
                    { id: 1, name: "Mozzarella", outOfStock: false },
                    { id: 6, name: "Gorgonzolla", outOfStock: false },
                    { id: 7, name: "Gruyère", outOfStock: false },
                ]
            }
        ]
    }

    public async create(): Promise<Pizza | null>
    {
        return { id: 0, name: "Nouvelle pizza", ingredients: [], price: 0.00 };
    }
}

export const pizzasService = new PizzasService();