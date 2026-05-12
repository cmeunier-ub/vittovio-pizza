import "./view-ingredients.css"

import { useEffect, useState } from "react";
import type { Ingredient } from "../../../models/ingredient";
import { IngredientViewer } from "../../components/ingredient-viewer/ingredient-viewer";
import { DialogEditIngredient } from "../../dialogs/dialog-edit-ingredient/dialog-edit-ingredient";
import { ingredientsService } from "../../../services/ingredients.service";

export function ViewIngredients()
{
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);
    const [editedIngredient, setEditedIngredient] = useState<Ingredient | null>(null);

    const loadIngredients = async () =>
    {
        setIngredients(await ingredientsService.findAll());
    }

    const displayIngredientList = (from: number, to: number) =>
    {
        const nodes = [];

        for (let i = from; i < to; ++i)
        {
            const ingredient = ingredients[i];
            nodes.push(<IngredientViewer key={`ingredient-${ingredient.id}`} ingredient={ingredient} onEdit={editIngredient} />);
        }

        return nodes;
    }

    const displayLeftIngredientList = () =>
    {
        return displayIngredientList(0, Math.trunc(ingredients.length / 2) + ingredients.length % 2);
    }

    const displayRightIngredientList = () =>
    {
        return displayIngredientList(Math.trunc(ingredients.length / 2) + ingredients.length % 2, ingredients.length);
    }

    const createIngredient = async () =>
    {
        const newIngredient = await ingredientsService.create();

        setIngredients([...ingredients, newIngredient]);

        editIngredient(newIngredient);
    }

    const editIngredient = (ingredient: Ingredient) =>
    {
        setEditedIngredient(ingredient);
    }

    const saveIngredient = (ingredient: Ingredient) =>
    {
        const newList = ingredients.filter(i => i.id !== ingredient.id);

        newList.push(ingredient);
        newList.sort((i1, i2) => i1.name.localeCompare(i2.name));

        setIngredients([...newList]);

        setEditedIngredient(null);
    }

    const deleteIngredient = () =>
    {
        if(!editedIngredient)
            return;

        setIngredients(ingredients.filter(i => i.id !== editedIngredient.id));
        setEditedIngredient(null);
    }

    useEffect(() =>
    {
        loadIngredients();
    }, []);

    return (
        <div className="view view-ingredients">
            <h1>Ingrédients</h1>
            <div className="actions">
                <button className="success" onClick={createIngredient}>Nouvel ingrédient</button>
                <input className="search" type="text" placeholder="Rechercher un ingrédient" />
            </div>
            <div className="ingredients">
                <div className="ingredients-list">{displayLeftIngredientList()}</div>
                <div className="ingredients-list">{displayRightIngredientList()}</div>
            </div>
            <DialogEditIngredient
                ingredient={editedIngredient ?? null}
                onSave={saveIngredient}
                onDelete={deleteIngredient}
                onCancel={() => setEditedIngredient(null)}
            />
        </div>
    )
}