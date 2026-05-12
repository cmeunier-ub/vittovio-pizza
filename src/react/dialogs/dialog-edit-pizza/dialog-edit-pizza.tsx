import { useEffect, useRef, useState } from "react"
import type { Pizza } from "../../../models/pizza"
import type { Ingredient } from "../../../models/ingredient";
import { ingredientsService } from "../../../services/ingredients.service";

type DialogEditPizzaProperties = {
    pizza: Pizza,
    onSave: (pizza: Pizza) => void,
    onDelete: () => void,
    onCancel: () => void,
}

export function DialogEditPizza({pizza, onSave, onDelete, onCancel}: DialogEditPizzaProperties)
{
    const dialog = useRef<HTMLDialogElement>(null);
    const txtName = useRef<HTMLInputElement>(null);
    const txtPrice = useRef<HTMLInputElement>(null);

    const [ ingredients, setIngredients ] = useState<Ingredient[]>([]);

    const [ usedIngredients, setUsedIngredients] = useState<Ingredient[]>([])

    const loadIngredients = async () => {
        setIngredients(await ingredientsService.findAll());
    }

    const ingredientIsUsed = (ingredient: Ingredient) => {
        if(!pizza)
            return false;

        return usedIngredients.findIndex(i => i.id === ingredient.id) !== -1;
    }

    const toggleIngredient = (ingredient: Ingredient) => {
        const index = usedIngredients.findIndex(i => i.id === ingredient.id);

        if(index === -1)
            setUsedIngredients([...usedIngredients, ingredient]);
        else
            setUsedIngredients(usedIngredients.filter(i => i.id !== ingredient.id));
    }

    const savePizza = () => {
        if(!pizza || !txtName.current || !txtPrice.current)
            return;

        const editedPizza = {
            id: pizza.id,
            name: txtName.current.value,
            ingredients: usedIngredients,
            price: parseFloat(txtPrice.current.value)
        }

        onSave(editedPizza);
    }

    const deletePizza = () => {
        if(pizza && confirm(`Souhaitez-vous réellement supprimer la ${pizza.name} ?`))
        {
            onDelete();
        }
    }

    useEffect(() => {
        if(pizza !== null)
        {
            if(txtName.current)
                txtName.current.value = pizza.name;

            if(txtPrice.current)
                txtPrice.current.value = pizza.price.toFixed(2);

            setUsedIngredients(pizza.ingredients);
            dialog.current?.showModal();
        }
        else
            dialog.current?.close();
    }, [pizza]);

    useEffect(() => {
        loadIngredients();
    }, []);

    return (
        <dialog ref={dialog}>
            <h2>Modification d'une pizza</h2>
            <div className="field">
                <label>Nom de la pizza</label>
                <input ref={txtName} type="text" defaultValue={pizza?.name} />
            </div>
            <div className="field">
                <label>Ingrédients</label>
                <div className="ingredients">
                    {
                        ingredients.map(i => 
                            <div key={`ingredient-${i.id}`}>
                                <input type="checkbox" checked={ingredientIsUsed(i)} onChange={() => {toggleIngredient(i)}} /> {i.name}
                            </div>
                        )
                    }
                </div>
            </div>
            <div className="field">
                <label>Prix de vente (€)</label>
                <input ref={txtPrice} type="number" defaultValue={pizza?.price} />
            </div>
            <div className="actions">
                <button className="success" onClick={savePizza}>Enregistrer</button>
                <button className="danger" onClick={deletePizza}>Supprimer</button>
                <button onClick={onCancel}>Annuler</button>
            </div>
        </dialog>
    )
}