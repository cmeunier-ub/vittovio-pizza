import "./ingredient-viewer.css"

import type { Ingredient } from "../../../models/ingredient"

type IngredientViewerProperties = {
    ingredient: Ingredient,
    onEdit: (ingredient: Ingredient) => void
}

export function IngredientViewer({ ingredient, onEdit }: IngredientViewerProperties)
{
    return <div className="ingredient-viewer">
        <div className="ingredient-name" onClick={() => onEdit(ingredient)}>{ingredient.name}</div>
        {ingredient.outOfStock && <div className="ingredient-out-of-stock">Stock épuisé</div>}
    </div>
}